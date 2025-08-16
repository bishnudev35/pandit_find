import React from "react";
import { CheckCircle, Calendar, Clock } from "lucide-react";

function PanditSignupDescription() {
  return (
    <div
      className="hidden md:flex md:w-2/5 p-10 flex-col gap-8 text-gray-700 text-lg leading-relaxed 
      bg-white/20 backdrop-blur-lg border border-white/30 rounded-tr-3xl rounded-br-3xl shadow-xl"
    >
      {/* Title + Intro */}
      <div className="space-y-3 text-center">
        <h3 className="text-3xl font-bold text-gray-900 drop-shadow-sm">
          Share Your Divine Knowledge
        </h3>
        <p className="text-gray-800 text-base leading-relaxed">
          Join our community of respected spiritual guides. Share your wisdom
          and help devotees on their spiritual journey.
        </p>
      </div>

      {/* Features List */}
      <div className="space-y-6">
        {/* Verified Profiles */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Verified Profiles</h4>
            <p className="text-gray-700 text-sm">
              All pandits are thoroughly verified
            </p>
          </div>
        </div>

        {/* Real-time Booking */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Real-time Booking</h4>
            <p className="text-gray-700 text-sm">
              View availability and book instantly
            </p>
          </div>
        </div>

        {/* Perfect Timing */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Perfect Timing</h4>
            <p className="text-gray-700 text-sm">
              Ensure rituals at auspicious times
            </p>
          </div>
        </div>
      </div>

      {/* Footer Tagline */}
      <div className="mt-auto p-5 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/40 shadow-inner">
        <p className="text-sm text-gray-800 italic text-center">
          Bridging the gap between tradition and technology for a more connected
          spiritual experience
        </p>
      </div>
    </div>
  );
}

export default PanditSignupDescription;
