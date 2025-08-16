import React from "react";
import { Award, Star, MapPin, ChevronRight } from "lucide-react";

function PanditSection({ filteredPandits, handlePanditSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredPandits.map((pandit) => (
        <div
          key={pandit.id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-3xl">{pandit.avatar}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold text-gray-800">
                      {pandit.name}
                    </h3>
                    {pandit.verified && (
                      <Award className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{pandit.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rating & Experience */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{pandit.rating}</span>
                <span className="text-sm text-gray-500">
                  ({pandit.reviews})
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {pandit.experience} exp.
              </div>
            </div>

            {/* Services */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-800 mb-2">
                Services:
              </h4>
              <div className="flex flex-wrap gap-1">
                {pandit.services.slice(0, 2).map((service) => (
                  <span
                    key={service}
                    className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                  >
                    {service}
                  </span>
                ))}
                {pandit.services.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{pandit.services.length - 2} more
                  </span>
                )}
              </div>
            </div>

            {/* Price & Action */}
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold text-orange-600">
                ₹{pandit.hourlyRate}/hr
              </div>
              <button
                onClick={() => handlePanditSelect(pandit)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 
                py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
              >
                <span>Book Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PanditSection;
