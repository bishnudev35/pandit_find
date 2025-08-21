import React from "react";
import { Info, Users, Calendar, CreditCard, Shield } from "lucide-react";
import Header from "./header/header";

function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col  text-gray-800">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-8 flex items-center space-x-3 text-orange-700">
          <Info className="w-9 h-9 text-orange-500" />
          <span>About PanditConnect</span>
        </h2>

        <p className="text-lg mb-6 leading-relaxed text-gray-700">
          <span className="font-semibold text-orange-600">PanditConnect</span>
          bridges the gap between devotees and qualified pandits, making it
          seamless to organize spiritual ceremonies and rituals with{" "}
          <span className="font-medium">authenticity</span>,
          <span className="font-medium"> convenience</span>, and
          <span className="font-medium"> trust</span>.
        </p>

        <p className="text-lg mb-8 leading-relaxed text-gray-700">
          Our platform is designed to simplify the entire process—from finding a
          trusted pandit to booking, scheduling, and payment. With modern
          technology at its core, PanditConnect ensures a smooth and transparent
          experience for both devotees and pandits. Whether it’s a simple puja
          at home or a grand ceremony, we provide a reliable way to connect
          traditions with today’s busy lifestyle.
        </p>

        {/* Features Section */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-xl shadow-sm hover:shadow-md transition">
            <Users className="w-6 h-6 text-orange-500" />
            <span className="font-medium">Verified & experienced pandits</span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-xl shadow-sm hover:shadow-md transition">
            <Calendar className="w-6 h-6 text-orange-500" />
            <span className="font-medium">Easy booking & scheduling</span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-xl shadow-sm hover:shadow-md transition">
            <CreditCard className="w-6 h-6 text-orange-500" />
            <span className="font-medium">Secure payment options</span>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-xl shadow-sm hover:shadow-md transition">
            <Shield className="w-6 h-6 text-orange-500" />
            <span className="font-medium">OTP-based service verification</span>
          </div>
        </div>
      </main>

      <footer className=" text-white py-10 mt-12">
        {" "}
        <div className="max-w-4xl mx-auto text-center px-6">
          {" "}
          <div className="text-6xl mb-4 animate-bounce">🕉️</div>{" "}
          <p className="italic text-xl mb-4">
            {" "}
            "Preserving traditions through technology"{" "}
          </p>{" "}
          <p className="text-white leading-relaxed max-w-2xl mx-auto">
            {" "}
            We aim to make spiritual services more{" "}
            <span className="font-semibold"> accessible</span>,{" "}
            <span className="font-semibold"> transparent</span>, and{" "}
            <span className="font-semibold"> reliable</span> for everyone, while
            honoring the sacred traditions of our culture.{" "}
          </p>{" "}
        </div>{" "}
      </footer>
    </div>
  );
}

export default AboutUs;
