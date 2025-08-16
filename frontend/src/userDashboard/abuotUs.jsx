import React from "react";
import { Info } from "lucide-react";    
import Header from "./header/header";

function AboutUs() {
  return (
    <div className="h-screen ">
        {/* Header */}
        <Header />
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 flex items-center space-x-3">
          <Info className="w-8 h-8" />
          <span>About PanditConnect</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-4 text-orange-100">
              PanditConnect bridges the gap between devotees and qualified pandits,
              making it easier to organize spiritual ceremonies and rituals with
              authenticity and convenience.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">✨</span>
                <span>Verified and experienced pandits</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">📅</span>
                <span>Easy booking and scheduling</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">💳</span>
                <span>Secure payment options</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🛡️</span>
                <span>OTP-based service verification</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-4">🕉️</div>
            <p className="text-orange-200 italic">
              "Preserving traditions through technology"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
