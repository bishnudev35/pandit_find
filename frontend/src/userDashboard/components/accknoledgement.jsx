import React from "react";
import { Check } from "lucide-react";

function Accknoledgement({ 
  selectedPandit, 
  selectedDate, 
  selectedTime, 
  resetBooking 
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Booking Confirmed!
      </h2>
      <p className="text-gray-600 mb-8">
        Your booking has been successfully confirmed. You will receive a
        confirmation message shortly.
      </p>

      <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
        <h3 className="font-medium text-gray-800 mb-4">Booking Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Booking ID:</span>
            <span className="font-medium">
              #PB{Math.floor(Math.random() * 10000)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Pandit:</span>
            <span className="font-medium">{selectedPandit?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time:</span>
            <span className="font-medium">
              {selectedDate?.weekday}, {selectedDate?.month} {selectedDate?.day} at {selectedTime?.display}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Amount Paid:</span>
            <span className="font-medium text-green-600">
              ₹{selectedPandit?.hourlyRate}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={resetBooking}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors duration-200"
        >
          Book Another Pandit
        </button>
        <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors duration-200">
          View My Bookings
        </button>
      </div>
    </div>
  );
}

export default Accknoledgement;
