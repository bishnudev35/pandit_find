import React from "react";
import Login from "./auth/login.jsx";

export default function App() {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-[#FFD9C0] bg-cover bg-center"
       style={{
    backgroundImage: "url('/bgMonk.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left center",
    backgroundSize: "contain",
   
  }}
    >
     <Login />
    
    </div>
  );
}
