import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/login.jsx";
import Signup from "./auth/signup.jsx";
import UserDashboard from "./userDashboard/dasboard.jsx";
import Header from "./userDashboard/header/header.jsx"; // Assuming you have a Header component
import AboutUs from "./userDashboard/abuotUs.jsx"; // Assuming you have an AboutUs component
import AllBooking from "./userDashboard/allBooking.jsx";
import PanditDashboard from "./panditDashboard/dsahboard.jsx";
import PanditEarnings from "./panditDashboard/totalEarnings.jsx"; // Assuming you have a PanditEarnings component
import BookYourPandit from "./userDashboard/bookYourPandit.jsx";
import Address from "./userDashboard/components/address.jsx";
// Assuming you have a PanditDashboard component
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
          <Route path="/bookPandit" element={<BookYourPandit/>}/>
          <Route path="/all-bookings" element={<AllBooking />} />
          <Route path="/pandit-dashboard" element={<PanditDashboard />} />
          <Route path="/pandit-earnings" element={<PanditEarnings />} />
          <Route path="/address" element={<Address/>}/>
          {/* Add more routes as needed */}
        </Routes>

       
      </div>
    </BrowserRouter>
  );
}
