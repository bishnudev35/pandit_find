import React, { useState } from "react";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Phone,
  MessageSquare,
  Download,
  Search,
  ChevronRight,
  Star,
} from "lucide-react";
import Header from "./header/header.jsx"; // Keep your pre-existing header

function AllBooking() {
  const [activeBookingFilter, setActiveBookingFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Enhanced bookings data
  const bookings = [
    {
      id: "PB1234",
      service: "Griha Pravesh",
      pandit: "Pandit Sharma Ji",
      panditPhone: "+91 98765 43210",
      date: "20 Aug 2025",
      time: "10:00 AM",
      duration: "2 hours",
      amount: "₹1,500",
      status: "booked",
      otp: "4521",
      rating: 4.8,
      address: "123 Temple Street, Mumbai",
      paymentMode: "Online",
    },
    {
      id: "PB5678",
      service: "Satyanarayan Katha",
      pandit: "Pandit Verma Ji",
      panditPhone: "+91 98765 43211",
      date: "10 Jul 2025",
      time: "5:00 PM",
      duration: "3 hours",
      amount: "₹2,000",
      status: "completed",
      rating: 4.9,
      address: "456 Sacred Avenue, Delhi",
      paymentMode: "Cash",
      feedback: "Excellent service, very knowledgeable",
    },
    {
      id: "PB9101",
      service: "Wedding Ceremony",
      pandit: "Pandit Mishra Ji",
      panditPhone: "+91 98765 43212",
      date: "5 Jun 2025",
      time: "9:00 AM",
      duration: "6 hours",
      amount: "₹5,000",
      status: "cancelled",
      address: "789 Marriage Hall, Pune",
      paymentMode: "Online",
      cancellationReason: "Family emergency",
    },
  ];

  // Filter and search
  const filteredBookings = bookings
    .filter(
      (b) => activeBookingFilter === "all" || b.status === activeBookingFilter
    )
    .filter(
      (b) =>
        b.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.pandit.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Status helpers
  const getStatusIcon = (status) => {
    switch (status) {
      case "booked":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "booked":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-50 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getBookingCount = (status) =>
    status === "all"
      ? bookings.length
      : bookings.filter((b) => b.status === status).length;

  return (
    <div className="min-h-screen ">
      {/* Pre-existing Header */}
      <Header />

      {/* Top Banner */}
      <div className=" p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-amber-600 flex items-center space-x-2">
          <Calendar className="w-7 h-7" />
          <span>My Bookings</span>
        </h2>
        <p className="text-sm mt-1">
          Manage and track all your spiritual service bookings
        </p>
      </div>

      {/* Search + Filters */}
      <div className="max-w-6xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by service, pandit, or booking ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {["all", "booked", "completed", "cancelled"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveBookingFilter(filter)}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeBookingFilter === filter
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span>
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        activeBookingFilter === filter
                          ? "bg-white bg-opacity-20 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {getBookingCount(filter)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No bookings found
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm
                  ? `No results for "${searchTerm}". Try adjusting your search.`
                  : "No bookings found for the selected filter."}
              </p>
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                Book New Service
              </button>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-orange-50 rounded-xl">
                      {getStatusIcon(booking.status)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {booking.service}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <p className="text-gray-600">with {booking.pandit}</p>
                        {booking.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-gray-600">
                              {booking.rating}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusStyle(
                      booking.status
                    )}`}
                  >
                    {booking.status.toUpperCase()}
                  </span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div>
                    <span className="text-gray-500 text-sm">Booking ID</span>
                    <p className="font-bold text-gray-800">{booking.id}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Date & Time</span>
                    <p className="font-bold">{booking.date}</p>
                    <p className="text-orange-600">{booking.time}</p>
                    <p className="text-gray-500 text-sm">
                      Duration: {booking.duration}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Amount</span>
                    <p className="font-bold text-green-600">{booking.amount}</p>
                    <p className="text-gray-500 text-sm">
                      {booking.paymentMode}
                    </p>
                  </div>
                  {booking.otp && (
                    <div>
                      <span className="text-gray-500 text-sm">Service OTP</span>
                      <p className="font-bold text-blue-600 text-xl">
                        {booking.otp}
                      </p>
                    </div>
                  )}
                </div>

                {/* Address */}
                <div className="mb-6">
                  <span className="text-gray-500 text-sm">Service Location</span>
                  <p className="text-gray-700">{booking.address}</p>
                </div>

                {/* Feedback / Cancel reason */}
                {booking.status === "completed" && booking.feedback && (
                  <div className="bg-green-50 p-4 rounded-xl mb-6">
                    <span className="text-green-700 text-sm font-medium">
                      Your Feedback
                    </span>
                    <p className="text-green-800 mt-1 italic">
                      "{booking.feedback}"
                    </p>
                  </div>
                )}
                {booking.status === "cancelled" && booking.cancellationReason && (
                  <div className="bg-red-50 p-4 rounded-xl mb-6">
                    <span className="text-red-700 text-sm font-medium">
                      Cancellation Reason
                    </span>
                    <p className="text-red-800 mt-1">
                      {booking.cancellationReason}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                  {booking.status === "booked" && (
                    <>
                      <button className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100">
                        <Phone className="w-4 h-4" />
                        <span>Call Pandit</span>
                      </button>
                      <button className="flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100">
                        <MessageSquare className="w-4 h-4" />
                        <span>Message</span>
                      </button>
                      <button className="flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg hover:bg-red-100">
                        <XCircle className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </>
                  )}
                  {booking.status === "completed" && (
                    <>
                      <button className="flex items-center space-x-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-lg hover:bg-orange-100">
                        <Star className="w-4 h-4" />
                        <span>Rate Service</span>
                      </button>
                      <button className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100">
                        <Download className="w-4 h-4" />
                        <span>Download Receipt</span>
                      </button>
                    </>
                  )}
                  <button className="flex items-center space-x-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 ml-auto">
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

     
     
    </div>
  );
}

export default AllBooking;
