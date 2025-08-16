import React, { useState } from "react";
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react";

import Header from "./header/header.jsx"; // Assuming you have a Header component

function AllBooking() {
  const [activeBookingFilter, setActiveBookingFilter] = useState("all");

  // Sample bookings data
  const bookings = [
    {
      id: "PB1234",
      service: "Griha Pravesh",
      pandit: "Pandit Sharma Ji",
      date: "20 Aug 2025",
      time: "10:00 AM",
      amount: "₹1500",
      status: "booked",
      otp: "4521",
    },
    {
      id: "PB5678",
      service: "Satyanarayan Katha",
      pandit: "Pandit Verma Ji",
      date: "10 Jul 2025",
      time: "5:00 PM",
      amount: "₹2000",
      status: "completed",
    },
    {
      id: "PB9101",
      service: "Wedding Ceremony",
      pandit: "Pandit Mishra Ji",
      date: "5 Jun 2025",
      time: "9:00 AM",
      amount: "₹5000",
      status: "cancelled",
    },
  ];

  // Filtered bookings
  const filteredBookings =
    activeBookingFilter === "all"
      ? bookings
      : bookings.filter((b) => b.status === activeBookingFilter);

  // Status helpers
  const getStatusIcon = (status) => {
    switch (status) {
      case "booked":
        return <Clock className="text-orange-500" />;
      case "completed":
        return <CheckCircle className="text-green-500" />;
      case "cancelled":
        return <XCircle className="text-red-500" />;
      default:
        return <Calendar className="text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "booked":
        return "bg-orange-100 text-orange-700 border-orange-300";
      case "completed":
        return "bg-green-100 text-green-700 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="h-screen">
        {/* Header */}
        <Header />

      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6">
        <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
          <Calendar className="w-7 h-7" />
          <span>My Bookings</span>
        </h2>
      </div>

      {/* Filter Buttons */}
      <div className="p-6 border-b border-gray-200 bg-orange-50">
        <div className="flex flex-wrap gap-2">
          {["all", "booked", "completed", "cancelled"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveBookingFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeBookingFilter === filter
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-white text-gray-600 hover:bg-orange-100 border border-orange-200"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
              {filter === "all" && (
                <span className="ml-1 text-xs">({bookings.length})</span>
              )}
              {filter !== "all" && (
                <span className="ml-1 text-xs">
                  ({bookings.filter((b) => b.status === filter).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="p-6">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">
              No bookings found for this filter
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all bg-gradient-to-r from-white to-orange-25"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">
                        {getStatusIcon(booking.status)}
                      </span>
                      <div>
                        <h3 className="font-bold text-lg text-gray-800">
                          {booking.service}
                        </h3>
                        <p className="text-gray-600">with {booking.pandit}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Booking ID:</span>
                        <p className="font-semibold">{booking.id}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Date & Time:</span>
                        <p className="font-semibold">{booking.date}</p>
                        <p className="text-orange-600">{booking.time}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Amount:</span>
                        <p className="font-semibold text-green-600">
                          {booking.amount}
                        </p>
                      </div>
                      {booking.otp && (
                        <div>
                          <span className="text-gray-500">OTP:</span>
                          <p className="font-bold text-blue-600 text-lg">
                            {booking.otp}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllBooking;
