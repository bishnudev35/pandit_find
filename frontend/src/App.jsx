import React from "react";
import Login from "./auth/login.jsx";
import Signup from "./auth/signup.jsx";

export default function App() {
  return (
    <div
      className="f min-h-screen bg-[#FFD9C0] bg-cover bg-center"
       style={{
    backgroundImage: "url('/bgMonk.png')",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left center",
    backgroundSize: "contain",
   
  }}
    >
     <Login />
     <Signup />
       <div className="text-center mt-8 text-gray-500 text-sm">
          <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
        </div>
    </div>
  );
}
