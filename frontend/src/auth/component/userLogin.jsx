import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // 👈 import icons

function UserLogin() {
  const [showPassword, setShowPassword] = useState(false); // 👈 state for toggle
  const [formData, setFormData] = useState({
    email: "",
    password: ""
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

    const userJson = {
      email: formData.email,
      password: formData.password
    };

    try {
      const response = await fetch(
        "https://pandit-find.onrender.com/api/v1/user/userLogin",
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
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        console.log("Login Success:", data);
        alert("Login successful!");
        navigate("/dashboard"); // ✅ redirect
      } else {
        alert(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error during Login:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="backdrop-blur-lg rounded-2xl shadow-lg p-8 ml-12 mb-8 bg-white/30 max-w-4/6">
      <h2 className="text-[#F97316] text-lg font-semibold">Your logo</h2>
      <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>

      {/* Attach handleSubmit here */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="username@gmail.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        {/* Password with Show/Hide */}
        <div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
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
          <div className="text-right mt-1">
            <a href="#" className="text-sm text-orange-500 hover:underline">
              Forgot Password?
            </a>
          </div>
        </div>

        {/* Sign in Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
        >
          Sign in
        </button>

        {/* Divider */}
        <div className="text-center text-gray-500">Or Continue With</div>

        {/* Social Login Buttons */}
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
      </form>

      {/* Register Link */}
      <p className="mt-5 text-center text-gray-600">
        Don’t have an account yet?{" "}
        <a href="/signup" className="text-orange-500 font-semibold">
          Register for free
        </a>
      </p>
    </div>
  );
}

export default UserLogin;
