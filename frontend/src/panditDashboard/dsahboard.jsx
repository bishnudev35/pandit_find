import React, { useState } from "react";
import Header from "./header/header";
import { User, Phone, MessageSquare, Eye, Check, X } from "lucide-react";

function Dashboard() {
  // Dummy bookings (today + tomorrow)
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date) =>
    date.toISOString().split("T")[0]; // YYYY-MM-DD format

  const [bookings, setBookings] = useState([
    {
      id: 1,
      date: formatDate(today),
      time: "10:00 AM",
      service: "Puja for Home",
      customer: "Amit Sharma",
      amount: 1500,
      otp: "1234",
      duration: "1 hr",
      status: "booked",
    },
    {
      id: 2,
      date: formatDate(today),
      time: "3:00 PM",
      service: "Marriage Ritual",
      customer: "Neha Verma",
      amount: 5000,
      otp: "5678",
      duration: "2 hrs",
      status: "completed",
    },
    {
      id: 3,
      date: formatDate(tomorrow),
      time: "9:00 AM",
      service: "Housewarming Puja",
      customer: "Rahul Singh",
      amount: 2500,
      otp: "9999",
      duration: "1.5 hrs",
      status: "cancelled",
    },
  ]);

  const [enteredOtp, setEnteredOtp] = useState({});

  // Handle OTP submission
  const handleOtpSubmit = (id) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status: enteredOtp[id] === b.otp ? "completed" : b.status,
            }
          : b
      )
    );
    setEnteredOtp((prev) => ({ ...prev, [id]: "" }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="mt-8 bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Recent Bookings
              </h3>
              <p className="text-blue-100">Manage your upcoming appointments</p>
            </div>
            <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-semibold hover:bg-white/30 transition-all">
              View All
            </button>
          </div>
        </div>

        {/* Booking list */}
        <div className="p-6">
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border border-orange-100 hover:shadow-lg transition-all"
              >
                <div className="flex items-center justify-between">
                  {/* Left Info */}
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-orange-100 rounded-xl">
                      <User className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-800">
                        {booking.service}
                      </h4>
                      <p className="text-gray-600">{booking.customer}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">
                          {new Date(booking.date).toLocaleDateString("en-IN")} at{" "}
                          {booking.time}
                        </span>
                        <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          ₹{booking.amount}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right actions */}
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="font-bold text-blue-600">
                        {booking.status === "booked" && `OTP: ${booking.otp}`}
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.duration}
                      </div>
                      {/* Status tags */}
                      {booking.status === "booked" && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                          Booked
                        </span>
                      )}
                      {booking.status === "completed" && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          Completed
                        </span>
                      )}
                      {booking.status === "cancelled" && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                          Cancelled
                        </span>
                      )}
                    </div>

                    {/* OTP input if booked */}
                    {booking.status === "booked" && (
                      <div className="flex space-x-2 items-center">
                        <input
                          type="text"
                          value={enteredOtp[booking.id] || ""}
                          onChange={(e) =>
                            setEnteredOtp((prev) => ({
                              ...prev,
                              [booking.id]: e.target.value,
                            }))
                          }
                          placeholder="Enter OTP"
                          className="border rounded-lg px-2 py-1 text-sm w-24"
                        />
                        <button
                          onClick={() => handleOtpSubmit(booking.id)}
                          className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex space-x-2">
                      <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      {booking.status !== "cancelled" && (
                        <button
                          onClick={() =>
                            setBookings((prev) =>
                              prev.map((b) =>
                                b.id === booking.id
                                  ? { ...b, status: "cancelled" }
                                  : b
                              )
                            )
                          }
                          className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
