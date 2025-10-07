import React, { useEffect, useState } from "react";
import Header from "./header/header";

function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
          setError("Authentication tokens not found. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:5400/api/v1/pandit/allBooking", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `${accessToken}`,
            "x-refresh-token": `${refreshToken}`,
          },
          credentials: "include",
        });

        if (response.status === 401) {
          setError("Session expired. Please log in again.");
          setLoading(false);
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        setBookings(data.bookings || []);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="p-8 text-center text-orange-600 font-semibold text-lg">
          Loading bookings...
        </div>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="p-8 text-center text-red-500 font-semibold text-lg">{error}</div>
      </div>
    );
  }

  // Empty UI
  if (bookings.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="p-8 text-center text-gray-500 text-lg">No bookings found.</div>
      </div>
    );
  }

  // Main Content UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-orange-700 mb-8 text-center">All Bookings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow-md p-5 border border-orange-200 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">{booking.service}</h3>
              <p className="text-sm text-gray-600 mb-2">Duration: {booking.duration} mins</p>

              <p className="text-sm">
                <span className="font-medium text-gray-700">Status:</span>{" "}
                <span
                  className={`font-semibold ${
                    booking.status === "confirmed"
                      ? "text-green-600"
                      : booking.status === "pending"
                      ? "text-orange-600"
                      : "text-gray-600"
                  }`}
                >
                  {booking.status}
                </span>
              </p>

              {/* User Info */}
              {booking.user && (
                <div className="mt-3 border-t border-gray-200 pt-3">
                  <p className="font-medium text-gray-800">👤 {booking.user.name}</p>
                  <p className="text-sm text-gray-600">{booking.user.email}</p>
                  <p className="text-sm text-gray-600">{booking.user.contactNo}</p>
                </div>
              )}

              {/* Address Info */}
              {booking.address && (
                <div className="mt-3 border-t border-gray-200 pt-3">
                  <p className="font-medium text-gray-800">📍 Address</p>
                  <p className="text-sm text-gray-600">
                    {booking.address.street}, {booking.address.city}
                  </p>
                  <p className="text-sm text-gray-600">
                    {booking.address.state}, {booking.address.country} - {booking.address.zipCode}
                  </p>
                </div>
              )}

              {/* Time Slots */}
              {booking.timeSlots && booking.timeSlots.length > 0 && (
                <div className="mt-3 border-t border-gray-200 pt-3">
                  <p className="font-medium text-gray-800">🕒 Time Slots:</p>
                  <ul className="text-sm text-gray-600 list-disc list-inside">
                    {booking.timeSlots.map((slot, i) => (
                      <li key={i}>
                        {new Date(slot.startTime).toLocaleString()} -{" "}
                        {new Date(slot.endTime).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Feedback */}
              {booking.feedback && (
                <div className="mt-3 border-t border-gray-200 pt-3">
                  <p className="font-medium text-gray-800">💬 Feedback</p>
                  <p className="text-sm text-gray-600 italic">"{booking.feedback}"</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllBookings;
