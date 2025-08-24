import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PanditSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    specialization: "",
    email: "",
    contactNo: "",
    yearsOfExperience: 0,
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // ✅ Ensure experience is a number (parseInt)
    const panditJson = {
      name: formData.fullName,
      email: formData.email,
      contactNo: formData.contactNo,
      experience: parseInt(formData.yearsOfExperience, 10), // FIXED
      password: formData.password
    };

    try {
      const response = await fetch(
        "http://localhost:5400/api/v1/pandit/PanditSignup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(panditJson)
        }
      );

      const data = await response.json();

      if (response.ok) {
        // ✅ store tokens in localStorage
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        console.log("Signup Success:", data);
        alert("Signup successful!");
        navigate("/pandit-dashboard");
      } else {
        alert(data.message || "Signup failed!");
      }
    } catch (error) {
      console.error("Error during Signup:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-8">
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 bg-white/50"
              placeholder="Your full name"
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specialization
            </label>
            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 bg-white/50"
            >
              <option value="">Select specialization</option>
              <option>Wedding Ceremonies</option>
              <option>House Warming</option>
              <option>Religious Rituals</option>
              <option>Astrology</option>
            </select>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 bg-white/50"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Contact No */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact No
          </label>
          <input
            type="number"
            name="contactNo"
            value={formData.contactNo}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 bg-white/50"
            placeholder="1234556789"
          />
        </div>

        {/* Years of Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Years of Experience
          </label>
          <input
            type="number"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 bg-white/50"
            placeholder="5"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Create Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a secure password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 
              focus:ring-2 focus:ring-orange-400 focus:border-transparent 
              transition-all duration-200 bg-white/50 backdrop-blur-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 
              focus:ring-2 focus:ring-orange-400 focus:border-transparent 
              transition-all duration-200 bg-white/50 backdrop-blur-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Apply as Pandit
      </button>

      {/* Login Redirect */}
      <p className="text-center text-sm text-gray-600">
        Already registered?
        <a
          href="/"
          className="text-purple-500 hover:text-purple-600 font-medium ml-1"
        >
          Sign in
        </a>
      </p>
    </form>
  );
}

export default PanditSignup;
