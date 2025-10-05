import React, { useState } from "react";

function ConfirmBooking({ panditId, selectedSlots, date, addressId }) {
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState(500);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

      const response = await fetch("http://localhost:5400/api/v1/user/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          "x-refresh-token": refreshToken,
        },
        credentials: "include",
        body: JSON.stringify({
          panditId,
          startTimes,
          service: {
            name: serviceName,
            price: servicePrice,
          },
          date,
          addressId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Booking failed");
      } else {
        setMessage(
          `Booking successful! Cost: ₹${data.cost}, OTP: ${data.booking.Otp}`
        );
        console.log("Booking details:", data.booking);
      }
    } catch (err) {
      console.error("Error booking:", err);
      setMessage("Booking failed due to server error");
    } finally {
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
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {loading ? "Booking..." : "Confirm Booking"}
      </button>

      {message && <p className="mt-4 text-green-600 font-medium">{message}</p>}
    </div>
  );
}

export default ConfirmBooking;
