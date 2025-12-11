import React, { useState, useEffect } from "react";
import { BadgeCheck, MapPin, Star, Clock, Phone, Mail, Loader2, X } from "lucide-react";
import PanditAvailableCalendar from "./components/BookNow";

const BookYourPandit = ({ addressId }) => {
  const [pandits, setPandits] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPandit, setSelectedPandit] = useState(null);

  // Fetch pandits nearby (10 km from user address)
  useEffect(() => {
    const fetchPandits = async () => {
      if (!addressId) return;

      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!token) {
          console.warn("⚠️ No access token found, user may not be logged in.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://pandit-find.onrender.com/api/v1/user/searchByLocation?addressId=${addressId}`,
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

        if (!response.ok) throw new Error("❌ Failed to fetch pandit details");

        const data = await response.json();
        setPandits(data.nearbyPandits || []);
        setUserLocation(data.userLocation || null);
      } catch (err) {
        console.error("Error fetching pandits:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPandits();
  }, [addressId]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-bold text-orange-700 mb-8 text-center">
          🔱 Book Your Pandit Nearby 🔱
        </h2>

        {/* User Location */}
        {userLocation && (
          <div className="backdrop-blur-xl bg-white/30 border border-white/40 shadow-lg rounded-2xl p-6 mb-8 text-center">
            <p className="text-gray-800 font-semibold text-lg">📍 Your Location</p>
            <p className="text-gray-900 text-base mt-2">
              {userLocation.street}, {userLocation.city}, {userLocation.state},{" "}
              {userLocation.country} {userLocation.zipCode || ""}
            </p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin w-8 h-8 text-orange-600 mr-2" />
            <span className="text-lg text-orange-700">Fetching Pandits...</span>
          </div>
        )}

        {/* Error */}
        {error && <p className="text-center text-red-600 font-medium">{error}</p>}

        {/* Pandit Cards */}
        {!loading && !error && pandits.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pandits.map((p) => (
              <div
                key={p.pandit.id}
                className="backdrop-blur-md bg-white/30 border border-white/40 shadow-lg hover:shadow-2xl transition-all rounded-2xl p-6 relative"
              >
                <div className="flex items-center gap-4">
                  <div className="text-5xl">🕉️</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      {p.pandit.name}
                      <BadgeCheck className="w-5 h-5 text-green-500" />
                    </h3>
                    {p.location ? (
                      <p className="text-sm text-gray-700 flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-orange-500" />
                        {p.location.city}, {p.location.state}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500 italic">Location not available</p>
                    )}
                    <p className="text-sm text-orange-600 font-medium flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {p.pandit.experience} years experience
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-800">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="font-semibold">
                    {p.pandit.rating > 0 ? p.pandit.rating.toFixed(1) : "New"}
                  </span>
                  {p.pandit.rating === 0 && <span className="ml-1 text-gray-500">(No reviews yet)</span>}
                </div>

                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Services Offered:</p>
                  {p.pandit.services && p.pandit.services.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {p.pandit.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-200/60 text-orange-800 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No services listed</p>
                  )}
                </div>

                <div className="mt-4 space-y-1 text-sm text-gray-700">
                  {p.pandit.contactNo && (
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-600" /> {p.pandit.contactNo}
                    </p>
                  )}
                  {p.pandit.email && (
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" /> {p.pandit.email}
                    </p>
                  )}
                </div>

                {/* Book Now Button */}
                <div className="mt-6 flex justify-center">
                  <button
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium shadow hover:bg-orange-600 transition-all"
                    onClick={() => setSelectedPandit(p.pandit.id)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && pandits.length === 0 && (
          <p className="text-center text-gray-600">No pandits available nearby.</p>
        )}
      </div>

      {/* Availability Calendar Modal */}
      {selectedPandit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full relative p-6">
            <button
              onClick={() => setSelectedPandit(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-orange-700 mb-4 text-center">
              Pandit Availability Calendar
            </h2>
            <PanditAvailableCalendar panditId={selectedPandit} addressId={addressId}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookYourPandit;
