import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // ✅ Import icons

function UserSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // ✅ initialize navigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userJson = {
      name: formData.fullName,
      email: formData.email,
      contactNo: formData.contactNo,
      password: formData.password,
    };

    try {
      const response = await fetch(
        "http://localhost:5400/api/v1/user/userSignup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // ✅ fixed case
          },
          body: JSON.stringify(userJson),
        }
      );

      const data = await response.json(); // ✅ parse response JSON

      if (response.ok) {
        // ✅ store tokens in localStorage
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        console.log("Signup Success:", data);
        alert("Signup successful!");
        navigate("/dashboard"); // ✅ redirect
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
      <div className="space-y-4">
        {/* Full Name & Contact No */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 
              focus:ring-2 focus:ring-orange-400 focus:border-transparent 
              transition-all duration-200 bg-white/50 backdrop-blur-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact No
            </label>
            <input
              type="number"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              placeholder="1234556789"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 
              focus:ring-2 focus:ring-orange-400 focus:border-transparent 
              transition-all duration-200 bg-white/50 backdrop-blur-sm"
              required
            />
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
            placeholder="your.email@example.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 
            focus:ring-2 focus:ring-orange-400 focus:border-transparent 
            transition-all duration-200 bg-white/50 backdrop-blur-sm"
            required
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

      {/* Sign Up Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white py-3 px-6 
        rounded-xl font-semibold hover:from-orange-500 hover:to-red-600 transform hover:scale-[1.02] 
        transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Sign Up
      </button>

      {/* Divider */}
      <div className="text-center text-gray-500">Or Continue With</div>

      {/* Social Login */}
      <div className="flex justify-center gap-4">
        <button type="button" className="p-3 border rounded-full hover:bg-gray-100">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
        </button>
        <button type="button" className="p-3 border rounded-full hover:bg-gray-100">
          <img
            src="https://www.svgrepo.com/show/512317/github-142.svg"
            alt="GitHub"
            className="w-5 h-5"
          />
        </button>
        <button type="button" className="p-3 border rounded-full hover:bg-gray-100">
          <img
            src="https://www.svgrepo.com/show/448224/facebook.svg"
            alt="Facebook"
            className="w-5 h-5"
          />
        </button>
      </div>

      {/* Login Link */}
      <p className="text-center text-sm text-gray-600">
        Already have an account?
        <a
          href="/"
          className="text-orange-500 hover:text-orange-600 font-medium ml-1"
        >
          Sign in
        </a>
      </p>
    </form>
  );
}

export default UserSignup;
