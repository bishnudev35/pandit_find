import React from "react";
import { CheckCircle, Calendar, Clock } from "lucide-react";

function UserSignupDescription() {
  return (
     <div className="hidden md:flex md:w-2/5 p-6 flex-col gap-6 items-center justify-center text-gray-700 text-lg leading-relaxed bg-orange-50"
>
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Find Your Spiritual Guide
              </h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                Connect with verified pandits and book services with complete trust. Experience seamless scheduling for your sacred ceremonies.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Verified Profiles</h4>
                  <p className="text-gray-600 text-sm">All pandits are thoroughly verified</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Real-time Booking</h4>
                  <p className="text-gray-600 text-sm">View availability and book instantly</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Perfect Timing</h4>
                  <p className="text-gray-600 text-sm">Ensure rituals at auspicious times</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30">
              <p className="text-sm text-gray-700 italic text-center">
                Bridging the gap between tradition and technology for a more connected spiritual experience
              </p>
            </div>
          </div>
  );
}
export default UserSignupDescription;
 // Ensure you have