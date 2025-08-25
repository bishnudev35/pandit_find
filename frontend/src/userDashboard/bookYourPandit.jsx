import React, { useState, useEffect } from "react";
import Headers from "./header/header.jsx";
import PanditSection from "./components/panditSection";
import AvailableCalendar from "./components/calender";
import PanditBooking from "./components/panditBooking";
import Accknoledgement from "./components/accknoledgement";

const BookYourPandit = ({ addressId }) => {
  const [pandits, setPandits] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedPandit, setSelectedPandit] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingStep, setBookingStep] = useState("search");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch pandits nearby (10 km from user address)
  useEffect(() => {
    const fetchPandits = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!token) {
          console.warn("⚠️ No access token found, user may not be logged in.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:5400/api/v1/user/searchByLocation?addressId=${addressId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              authorization: `${token}`,
              "x-refresh-token": `${refreshToken}`,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("❌ Failed to fetch pandit details");
        }

        const data = await response.json();
        setPandits(data.nearbyPandits || []);
        setUserLocation(data.userLocation || null);
      } catch (err) {
        console.error("Error fetching pandits:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (addressId) fetchPandits();
  }, [addressId]);

  // Generate next 15 days calendar
  const generateCalendarDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 15; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date,
        dateStr: date.toISOString().split("T")[0],
        day: date.getDate(),
        month: date.toLocaleDateString("en-US", { month: "short" }),
        weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      });
    }
    return dates;
  };

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 8;
    const endHour = 20;

    for (let hour = startHour; hour < endHour; hour++) {
      slots.push({
        time: `${hour}:00`,
        display: `${hour > 12 ? hour - 12 : hour}:00 ${
          hour >= 12 ? "PM" : "AM"
        }`,
        available: Math.random() > 0.3,
      });
      slots.push({
        time: `${hour}:30`,
        display: `${hour > 12 ? hour - 12 : hour}:30 ${
          hour >= 12 ? "PM" : "AM"
        }`,
        available: Math.random() > 0.3,
      });
    }
    return slots;
  };

  const calendarDates = generateCalendarDates();
  const timeSlots = generateTimeSlots();

  const handlePanditSelect = (pandit) => {
    setSelectedPandit(pandit);
    setBookingStep("calendar");
  };

  const handleTimeSlotSelect = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setBookingStep("booking");
  };

  const handleBookingConfirm = () => {
    setBookingStep("confirmation");
  };

  const resetBooking = () => {
    setBookingStep("search");
    setSelectedPandit(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  return (
    <div className="h-screen">
   

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && <p className="text-center text-gray-500">Loading pandits...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Show user location */}
        {userLocation && (
          <p className="text-center text-gray-700 mb-4">
            📍 Your Location: {userLocation.latitude}, {userLocation.longitude}
          </p>
        )}

        {bookingStep === "search" && (
          <PanditSection
            filteredPandits={pandits.map((p) => ({
              id: p.pandit.id,
              name: p.pandit.name,
              location: `${p.location.street}, ${p.location.city}, ${p.location.state}`,
              rating: p.pandit.rating,
              experience: p.pandit.experience,
              services: p.pandit.services,
              contactNo: p.pandit.contactNo,
              email: p.pandit.email,
            }))}
            handlePanditSelect={handlePanditSelect}
          />
        )}

        {bookingStep === "calendar" && selectedPandit && (
          <AvailableCalendar
            selectedPandit={selectedPandit}
            calendarDates={calendarDates}
            timeSlots={timeSlots}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            handleTimeSlotSelect={handleTimeSlotSelect}
            resetBooking={resetBooking}
          />
        )}

        {bookingStep === "booking" &&
          selectedPandit &&
          selectedDate &&
          selectedTime && (
            <PanditBooking
              selectedPandit={selectedPandit}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              setBookingStep={setBookingStep}
              handleBookingConfirm={handleBookingConfirm}
            />
          )}

        {bookingStep === "confirmation" && (
          <Accknoledgement
            selectedPandit={selectedPandit}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            resetBooking={resetBooking}
          />
        )}
      </div>
    </div>
  );
};

export default BookYourPandit;
