import React, { useState, useEffect } from "react";
import axios from "axios";

function ConfirmBooking({ panditId, selectedSlots, date, addressId }) {
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState(500);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Load Razorpay script once
  useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const handleBooking = async () => {
    if (!serviceName) {
      alert("Please enter service name");
      return;
    }
    if (!selectedSlots || selectedSlots.length === 0) {
      alert("Please select at least one slot");
      return;
    }

    setLoading(true);
    setMessage("");

    const startTimes = selectedSlots.map((slot) => slot.startTime);

    try {
      const token = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      // 🟢 STEP 1: Create Razorpay order + booking initiation
      const { data } = await axios.post(
        "http://localhost:5400/api/v1/user/booking",
        {
          panditId,
          startTimes,
          service: { name: serviceName, price: servicePrice },
          date,
          addressId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
            "x-refresh-token": refreshToken,
          },
          withCredentials: true,
        }
      );

      if (!data.razorpayOrder) {
        setMessage(data.message || "Failed to create Razorpay order");
        setLoading(false);
        return;
      }

      // 🟢 STEP 2: Open Razorpay checkout
      const razorpayOptions = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.razorpayOrder.amount,
        currency: data.razorpayOrder.currency,
        name: "Pandit Booking",
        description: serviceName,
        order_id: data.razorpayOrder.id,
        handler: async function (response) {
          // 🟢 STEP 3: Verify payment via same backend route
          try {
            const verifyRes = await axios.post(
              "http://localhost:5400/api/v1/user/booking",
              {
                panditId,
                startTimes,
                service: { name: serviceName, price: servicePrice },
                date,
                addressId,
                payment: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                },
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token,
                  "x-refresh-token": refreshToken,
                },
                withCredentials: true,
              }
            );

            console.log("✅ Booking response:", verifyRes.data);

            // ✅ FIXED: Access OTP correctly from response
            const otp = verifyRes.data.booking?.Otp;
            
            if (otp) {
              setMessage(`✅ Booking Confirmed! Payment Successful. OTP: ${otp}`);
            } else {
              setMessage("✅ Booking Confirmed! Payment Successful.");
              console.warn("OTP not found in response:", verifyRes.data);
            }
          } catch (verifyErr) {
            console.error("Payment verification failed:", verifyErr);
            const errorMsg = verifyErr.response?.data?.message || "Payment verification failed";
            setMessage(`❌ ${errorMsg}`);
          }
        },
        prefill: {
          name: "Demo User",
          email: "demo@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#6366F1",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setMessage("Payment cancelled by user");
          },
        },
      };

      const razor = new window.Razorpay(razorpayOptions);
      razor.open();
    } catch (err) {
      console.error("Error during booking/payment:", err);
      const errorMsg = err.response?.data?.message || "Something went wrong while booking";
      setMessage(`❌ ${errorMsg}`);
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-4">Confirm Your Booking</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Service Name:</label>
        <input
          type="text"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter service name"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Service Price (₹):</label>
        <input
          type="number"
          value={servicePrice}
          onChange={(e) => setServicePrice(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Selected Slots:</h3>
        <ul className="list-disc pl-5">
          {selectedSlots.map((slot) => (
            <li key={slot.id}>
              {new Date(slot.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              -{" "}
              {new Date(slot.endTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleBooking}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Confirm & Pay"}
      </button>

      {message && (
        <p className={`mt-4 font-medium ${message.includes('❌') ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ConfirmBooking;