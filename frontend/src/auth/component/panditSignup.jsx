import React, { useState } from "react";

function PanditSignup() {
  const [formData, setFormData] = useState({
    fullName: "",
    specialization: "",
    email: "",
    contactNo: "",
    yearsOfExperience: "",
    password: "",
    confirmPassword: ""
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const panditJson = {
      name: formData.fullName,
      specialization: formData.specialization,
      email: formData.email,
      contactNo: formData.contactNo,
      yearsOfExperience: formData.yearsOfExperience,
      password: formData.password
    };

    console.log("Pandit JSON:", JSON.stringify(panditJson, null, 2));
    alert("Signup data logged in console!");
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
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 bg-white/50"
            placeholder="Create a secure password"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 bg-white/50"
            placeholder="Confirm password"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Apply as Pandit
      </button>

      {/* Divider */}
      <div className="text-center text-gray-500">Or Continue With</div>

      {/* Social Login */}
      <div className="flex justify-center gap-4">
        <button className="p-3 border rounded-full hover:bg-gray-100">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
        </button>
        <button className="p-3 border rounded-full hover:bg-gray-100">
          <img
            src="https://www.svgrepo.com/show/512317/github-142.svg"
            alt="GitHub"
            className="w-5 h-5"
          />
        </button>
        <button className="p-3 border rounded-full hover:bg-gray-100">
          <img
            src="https://www.svgrepo.com/show/448224/facebook.svg"
            alt="Facebook"
            className="w-5 h-5"
          />
        </button>
      </div>

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
