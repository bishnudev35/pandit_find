import React from "react";
import { X } from "lucide-react";

function PanditBooking({
  selectedPandit,
  selectedDate,
  selectedTime,
  setBookingStep,
  handleBookingConfirm
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Confirm Booking</h2>
        <button
          onClick={() => setBookingStep("calendar")}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Details */}
        <div>
          <div className="bg-orange-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-800 mb-3">Booking Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Pandit:</span>
                <span className="font-medium">{selectedPandit?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">
                  {selectedDate?.weekday}, {selectedDate?.month}{" "}
                  {selectedDate?.day}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{selectedTime?.display}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rate:</span>
                <span className="font-medium">
                  ₹{selectedPandit?.hourlyRate}/hr
                </span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span className="text-orange-600">
                  ₹{selectedPandit?.hourlyRate}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-800">Your Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <textarea
              placeholder="Special requirements or message (optional)"
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            ></textarea>
          </div>
        </div>

        {/* Payment */}
        <div>
          <h3 className="font-medium text-gray-800 mb-4">Payment Method</h3>
          <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                id="upi"
                className="w-4 h-4 text-orange-500"
              />
              <label htmlFor="upi" className="flex-1 cursor-pointer">
                UPI Payment
              </label>
            </div>
            <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                id="card"
                className="w-4 h-4 text-orange-500"
              />
              <label htmlFor="card" className="flex-1 cursor-pointer">
                Credit/Debit Card
              </label>
            </div>
            <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                id="wallet"
                className="w-4 h-4 text-orange-500"
              />
              <label htmlFor="wallet" className="flex-1 cursor-pointer">
                Digital Wallet
              </label>
            </div>
          </div>

          <button
            onClick={handleBookingConfirm}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-medium text-lg transition-colors duration-200"
          >
            Pay ₹{selectedPandit?.hourlyRate} & Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default PanditBooking;
