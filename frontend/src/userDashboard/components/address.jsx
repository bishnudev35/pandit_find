import React, { useState } from "react";
import { Home, MapPin, Globe, Landmark, Hash } from "lucide-react";
import BookYourPandit from "../bookYourPandit";
import Header from "../header/header";

function Address() {
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [addressId, setAddressId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        "https://pandit-find.onrender.com/api/v1/user/userAddress",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `${token}`,
            "x-refresh-token": `${refreshToken}`,
          },
          credentials: "include",
          body: JSON.stringify({ address: formData }),
        }
      );

      if (!response.ok) {
        throw new Error("❌ Failed to update the address");
      }

      const data = await response.json();
      alert("✅ Address saved successfully!");
      setAddressId(data.address.id);
    } catch (error) {
      console.error("Error during address submission:", error);
      alert("❌ Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />

      {/* Show Address Form if no address is saved */}
      {!addressId && (
        <>
          {/* Decorative Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-400/30 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-yellow-400/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
          </div>

          {/* Main Content */}
          <div className="flex  justify-center  relative z-10">
            <div className="w-full max-w-4xl bg-white/20 backdrop-blur-xl border border-white/30 p-10 rounded-3xl shadow-2xl mt-8">
              <h2 className="text-4xl font-extrabold text-center text-orange-900 mb-10">
                🕉️ Search Your Pandit
              </h2>

              {/* Address Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { icon: Home, name: "street", placeholder: "Street / Landmark / House No." },
                  { icon: MapPin, name: "city", placeholder: "City" },
                  { icon: Landmark, name: "state", placeholder: "State" },
                  { icon: Globe, name: "country", placeholder: "Country" },
                  { icon: Hash, name: "zipCode", placeholder: "Zip Code" },
                ].map((field, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-white/40 border border-white/50 p-4 rounded-xl shadow-sm hover:shadow-md transition"
                  >
                    <field.icon className="text-orange-700 mr-4" size={24} />
                    <input
                      type="text"
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full bg-transparent placeholder-gray-700 text-gray-900 font-medium outline-none"
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-700 hover:from-orange-600 hover:to-orange-800 text-white font-semibold py-4 rounded-xl shadow-lg transition transform hover:scale-105 disabled:opacity-60"
                >
                  {loading ? "Finding..." : "Find"}
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Show BookYourPandit after saving address */}
      {addressId && (
        <div className="mt-6">
          <BookYourPandit addressId={addressId} />
        </div>
      )}
    </div>
  );
}

export default Address;
