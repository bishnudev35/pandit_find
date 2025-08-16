import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./auth/login.jsx";
import Signup from "./auth/signup.jsx";

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
        </Routes>

       
      </div>
    </BrowserRouter>
  );
}
