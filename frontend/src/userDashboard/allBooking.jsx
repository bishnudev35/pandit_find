import React, { useState, useEffect } from "react";
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
import Header from "./header/header.jsx";

function AllBooking() {
  const [bookings, setBookings] = useState([]);
  const [activeBookingFilter, setActiveBookingFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!token) {
          console.warn("⚠️ No access token found, user may not be logged in.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:5400/api/v1/user/allBooking`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `${token}`,
              "x-refresh-token": `${refreshToken}`,
            },
            credentials: "include",
          }
        );

        if (!response.ok)
          throw new Error("❌ Failed to fetch booking details");

        const data = await response.json();
        console.log("✅ Booking Data:", data);

        if (data && Array.isArray(data.bookings)) {
          setBookings(data.bookings);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAllBookings();
  }, []);

  // Helpers
  const getStatusIcon = (status) => {
    switch (status) {
      case "BOOKED":
        return <Clock className="w-5 h-5 text-blue-500" />;
      case "COMPLETED":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "CANCELLED":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Calendar className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "BOOKED":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "COMPLETED":
        return "bg-green-50 text-green-700 border-green-200";
      case "CANCELLED":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getBookingCount = (status) =>
    status === "all"
      ? bookings.length
      : bookings.filter((b) => b.status === status.toUpperCase()).length;

  // Filter and search
  const filteredBookings = bookings
    .filter(
      (b) =>
        activeBookingFilter === "all" ||
        b.status === activeBookingFilter.toUpperCase()
    )
    .filter(
      (b) =>
        b.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.pandit?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="min-h-screen">
      <Header />

      {/* Header Section */}
      <div className="p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-amber-600 flex items-center space-x-2">
          <Calendar className="w-7 h-7" />
          <span>My Bookings</span>
        </h2>
        <p className="text-sm mt-1">
          Manage and track all your spiritual service bookings
        </p>
      </div>

      {/* Search + Filter Section */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by service or booking ID..."
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

        {/* Booking List */}
        {loading ? (
          <div className="text-center py-20">
            <Clock className="w-10 h-10 mx-auto text-orange-400 animate-spin" />
            <p className="mt-4 text-gray-600">Loading your bookings...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-semibold">
            {error}
          </div>
        ) : filteredBookings.length === 0 ? (
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
          <div className="space-y-6">
            {filteredBookings.map((b) => (
              <div
                key={b.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-orange-50 rounded-xl">
                      {getStatusIcon(b.status)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {b.service || "Service"}
                      </h3>
                      <p className="text-gray-600">
                        with {b.pandit?.name || "Pandit"}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusStyle(
                      b.status
                    )}`}
                  >
                    {b.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div>
                    <span className="text-gray-500 text-sm">Booking ID</span>
                    <p className="font-bold text-gray-800">{b.id}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Duration</span>
                    <p className="font-bold text-gray-800">{b.duration} min</p>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Amount</span>
                    <p className="font-bold text-green-600">₹{b.ammount}</p>
                  </div>
                  {b.Otp && (
                    <div>
                      <span className="text-gray-500 text-sm">Service OTP</span>
                      <p className="font-bold text-blue-600 text-xl">{b.Otp}</p>
                    </div>
                  )}
                </div>

                {b.address && (
                  <div className="mb-6">
                    <span className="text-gray-500 text-sm">
                      Service Location
                    </span>
                    <p className="text-gray-700">
                      {b.address?.street}, {b.address?.city}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                  <button className="flex items-center space-x-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 ml-auto">
                    <span>View Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
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
