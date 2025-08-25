import React, { useEffect, useState } from "react";
import Headers from "./header/header.jsx";
import { BadgeCheck, MapPin, Star, Clock, Phone, Mail, Loader2 } from "lucide-react";

const UserDashboard = () => {
  const [pandits, setPandits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPandits = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          console.warn("⚠️ No access token found, user may not be logged in.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:5400/api/v1/user/reputedPandit",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("❌ Failed to fetch pandit details");
        }

        const data = await response.json();
        setPandits(data || []); // data is array
      } catch (err) {
        console.error("Error fetching pandits:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPandits();
  }, []);

  return (
    <div className="min-h-screen">
      <Headers />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-bold text-orange-700 mb-8 text-center">
          ✨ Available Pandits for Your Divine Occasions ✨
        </h2>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin w-8 h-8 text-orange-600 mr-2" />
            <span className="text-lg text-orange-700">Fetching Pandits...</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-600 font-medium">{error}</p>
        )}

        {/* Pandit Cards */}
        {!loading && !error && pandits.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pandits.map((pandit) => (
              <div
                key={pandit.id}
                className="backdrop-blur-md bg-white/30 border border-white/40 shadow-lg hover:shadow-2xl transition-all rounded-2xl p-6 relative"
              >
                {/* Name + Experience */}
                <div className="flex items-center gap-4">
                  <div className="text-5xl">🕉️</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                      {pandit.name}
                      <BadgeCheck className="w-5 h-5 text-green-500" />
                    </h3>
                    {pandit.address ? (
                      <p className="text-sm text-gray-700 flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-orange-500" />
                        {pandit.address.city}, {pandit.address.state}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        Location not available
                      </p>
                    )}
                    <p className="text-sm text-orange-600 font-medium flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {pandit.experience} years experience
                    </p>
                  </div>
                </div>

                {/* Rating */}
                <div className="mt-4 flex items-center text-sm text-gray-800">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="font-semibold">
                    {pandit.rating > 0 ? pandit.rating.toFixed(1) : "New"}
                  </span>
                  {pandit.rating === 0 && (
                    <span className="ml-1 text-gray-500">(No reviews yet)</span>
                  )}
                </div>

                {/* Services */}
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Services Offered:
                  </p>
                  {pandit.services && pandit.services.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {pandit.services.map((service, idx) => (
                        <span
                          key={idx}
                          className="bg-orange-200/60 text-orange-800 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
                      No services listed
                    </p>
                  )}
                </div>

                {/* Contact Info */}
                <div className="mt-4 space-y-1 text-sm text-gray-700">
                  {pandit.contactNo && (
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-600" />{" "}
                      {pandit.contactNo}
                    </p>
                  )}
                  {pandit.email && (
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" /> {pandit.email}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Pandits */}
        {!loading && !error && pandits.length === 0 && (
          <p className="text-center text-gray-600">No pandits available.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
