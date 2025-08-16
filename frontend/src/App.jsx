import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/login.jsx";
import Signup from "./auth/signup.jsx";
import UserDashboard from "./userDashboard/dasboard.jsx";
import Header from "./userDashboard/header/header.jsx"; // Assuming you have a Header component
import AboutUs from "./userDashboard/abuotUs.jsx"; // Assuming you have an AboutUs component
import AllBooking from "./userDashboard/allBooking.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <div
        className=" bg-[#FFD9C0] bg-cover bg-center"
        style={{
          backgroundImage: "url('/bgMonk.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "left center",
          backgroundSize: "contain",
        }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/header" element={<Header />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/all-bookings" element={<AllBooking />} />
          {/* Add more routes as needed */}
        </Routes>

       
      </div>
    </BrowserRouter>
  );
}
