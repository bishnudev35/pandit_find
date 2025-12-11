import React, { useState, useEffect } from "react";
import ConfirmBooking from "./paymentMethod";

function PanditAvailableCalendar({ panditId, addressId }) {
  const [calendar, setCalendar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [showConfirmPage, setShowConfirmPage] = useState(false); // new state

  useEffect(() => {
    if (!panditId) return;

    const fetchCalendar = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!token) {
          setError("No access token found. Please log in.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://pandit-find.onrender.com/api/v1/user/getCalendar/${panditId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
              "x-refresh-token": refreshToken,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          if (response.status === 404)
            throw new Error("No calendar found for this pandit.");
          else throw new Error("Failed to fetch pandit availability.");
        }

        const data = await response.json();
        setCalendar(data.calendar || []);
      } catch (err) {
        console.error("Error fetching calendar:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, [panditId]);

  const handleDateClick = (dateId) => {
    setSelectedDate(dateId === selectedDate ? null : dateId);
    setSelectedSlots([]);
  };

  const handleSlotClick = (slotIndex) => {
    const date = calendar.find((d) => d.id === selectedDate);
    const slot = date.timeSlots[slotIndex];

    if (slot.status !== "AVAILABLE") return;

    if (selectedSlots.length === 0) {
      setSelectedSlots([slotIndex]);
    } else {
      const firstIndex = selectedSlots[0];
      const lastIndex = selectedSlots[selectedSlots.length - 1];

      if (slotIndex === lastIndex + 1) {
        setSelectedSlots([...selectedSlots, slotIndex]);
      } else if (slotIndex === firstIndex - 1) {
        setSelectedSlots([slotIndex, ...selectedSlots]);
      } else if (selectedSlots.includes(slotIndex)) {
        setSelectedSlots(selectedSlots.filter((i) => i !== slotIndex));
      } else {
        setSelectedSlots([slotIndex]);
      }
    }
  };

  const handleConfirmSlots = () => {
    if (!selectedDate || selectedSlots.length === 0) return;
    // Switch to confirmation page
    setShowConfirmPage(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-200 text-green-800";
      case "BOOKED":
        return "bg-red-200 text-red-800";
      case "BLOCKED":
        return "bg-gray-200 text-gray-500";
      default:
        return "bg-white";
    }
  };

  if (loading) return <p>Loading calendar...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (calendar.length === 0) return <p>No availability found for this pandit.</p>;

  // Show ConfirmBooking page if user clicked confirm
  if (showConfirmPage) {
    const dateObj = calendar.find((d) => d.id === selectedDate);
    const slots = selectedSlots.map((i) => dateObj.timeSlots[i]);
    return (
      <ConfirmBooking
        panditId={panditId}
        selectedSlots={slots}
        date={dateObj.date}
        addressId={addressId}
      />
    );
  }

  return (
    <div className="p-4">
      {/* Step 1: Show Dates */}
      {!selectedDate && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {calendar.map((day) => (
            <button
              key={day.id}
              onClick={() => handleDateClick(day.id)}
              className="border rounded p-3 hover:bg-orange-100 transition-colors font-semibold text-center"
            >
              📅 {new Date(day.date).toLocaleDateString()}
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Show Time Slots */}
      {selectedDate && (
        <div>
          <button
            onClick={() => setSelectedDate(null)}
            className="text-sm text-red-500 mb-4 underline"
          >
            ← Back to Dates
          </button>

          {calendar
            .filter((day) => day.id === selectedDate)
            .map((day) => (
              <div key={day.id}>
                <h3 className="font-semibold mb-2">
                  📅 {new Date(day.date).toLocaleDateString()}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {day.timeSlots.map((slot, index) => {
                    const isSelected = selectedSlots.includes(index);
                    const statusClass = getStatusColor(slot.status);
                    return (
                      <button
                        key={slot.id}
                        disabled={slot.status !== "AVAILABLE"}
                        onClick={() => handleSlotClick(index)}
                        className={`p-2 border rounded text-sm font-medium ${
                          isSelected
                            ? "bg-orange-500 text-white"
                            : `${statusClass} hover:bg-orange-100`
                        }`}
                      >
                        {new Date(slot.startTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                        -{" "}
                        {new Date(slot.endTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        <br />
                        <span className="text-xs font-semibold">
                          {slot.status}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Confirm Slots Button */}
                {selectedSlots.length > 0 && (
                  <button
                    onClick={handleConfirmSlots}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    ✅ Confirm Selected Slots
                  </button>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default PanditAvailableCalendar;
