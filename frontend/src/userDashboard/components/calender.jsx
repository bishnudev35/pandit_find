import React from 'react';
import { X } from 'lucide-react';
import { useState } from 'react';

function AvailableCalendar({
  selectedPandit,
  calendarDates,
  timeSlots,
  selectedDate,
  setSelectedDate,
  handleTimeSlotSelect,
  resetBooking
})
 {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Select Date & Time</h2>
          <p className="text-gray-600">Booking with {selectedPandit.name}</p>
        </div>
        <button
          onClick={resetBooking}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Date Selection */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Available Dates</h3>
        <div className="grid grid-cols-7 md:grid-cols-15 gap-2 overflow-x-auto">
          {calendarDates.map((dateObj, index) => (
            <div
              key={index}
              onClick={() => setSelectedDate(dateObj)}
              className={`p-3 rounded-lg text-center cursor-pointer transition-all duration-200 min-w-[70px] ${
                selectedDate?.dateStr === dateObj.dateStr
                  ? 'bg-orange-500 text-white shadow-lg'
                  : 'bg-gray-50 hover:bg-orange-100 text-gray-800'
              }`}
            >
              <div className="text-xs font-medium">{dateObj.weekday}</div>
              <div className="text-lg font-bold">{dateObj.day}</div>
              <div className="text-xs">{dateObj.month}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Available Times - {selectedDate.weekday}, {selectedDate.month} {selectedDate.day}
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {timeSlots.map((slot, index) => (
              <button
                key={index}
                onClick={() => slot.available && handleTimeSlotSelect(selectedDate, slot)}
                disabled={!slot.available}
                className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  slot.available
                    ? 'bg-green-50 text-green-800 hover:bg-green-100 border border-green-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                }`}
              >
                {slot.display}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AvailableCalendar;
