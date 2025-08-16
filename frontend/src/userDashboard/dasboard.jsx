import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Star,
  Clock,
  Calendar,
  User,
  Bell,
  Filter,
  ChevronRight,
  X,
  Check,
  Phone,
  Mail,
  Award,
} from "lucide-react";
import Headers from "./header/header.jsx";
import SearchSection from "./components/searchSection";
import PanditSection from "./components/panditSection";
import AvailableCalendar from "./components/calender";
import PanditBooking from "./components/panditBooking";
import Accknoledgement from "./components/accknoledgement";
const UserDashboard = () => {
  const [selectedPandit, setSelectedPandit] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingStep, setBookingStep] = useState("search"); // search, calendar, booking, confirmation
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");

  // Sample pandit data
  const pandits = [
    {
      id: 1,
      name: "Pandit Rajesh Sharma",
      location: "Siliguri, West Bengal",
      rating: 4.8,
      reviews: 127,
      experience: "12 years",
      services: ["Marriage Ceremony", "Griha Pravesh", "Satyanarayan Puja"],
      hourlyRate: 800,
      avatar: "🕉️",
      verified: true,
      languages: ["Hindi", "Bengali", "Sanskrit"],
    },
    {
      id: 2,
      name: "Pandit Krishnan Iyer",
      location: "Jalpaiguri, West Bengal",
      rating: 4.9,
      reviews: 89,
      experience: "15 years",
      services: ["Ganesh Puja", "Durga Puja", "Marriage Ceremony"],
      hourlyRate: 1200,
      avatar: "🕉️",
      verified: true,
      languages: ["Tamil", "Hindi", "Sanskrit"],
    },
    {
      id: 3,
      name: "Pandit Amit Bhattacharya",
      location: "Siliguri, West Bengal",
      rating: 4.7,
      reviews: 156,
      experience: "8 years",
      services: ["Kali Puja", "Lakshmi Puja", "Griha Pravesh"],
      hourlyRate: 600,
      avatar: "🕉️",
      verified: true,
      languages: ["Bengali", "Hindi", "Sanskrit"],
    },
  ];

  // Generate calendar dates for next 15 days
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
        available: Math.random() > 0.3, // Random availability for demo
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

  const filteredPandits = pandits.filter((pandit) => {
    const matchesSearch =
      pandit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pandit.services.some((service) =>
        service.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesLocation =
      !locationFilter ||
      pandit.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesService =
      !serviceFilter || pandit.services.includes(serviceFilter);
    return matchesSearch && matchesLocation && matchesService;
  });

  const services = [
    "Marriage Ceremony",
    "Griha Pravesh",
    "Satyanarayan Puja",
    "Ganesh Puja",
    "Durga Puja",
    "Kali Puja",
    "Lakshmi Puja",
  ];

  return (
    <div className="h-screen ">
      {/* Header */}
      <Headers />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {bookingStep === "search" && (
          <div>
            {/* Search Section */}
            <SearchSection services={services} />

            {/* Pandits Grid */}

            <PanditSection
              filteredPandits={filteredPandits}
              handlePanditSelect={handlePanditSelect}
            />
          </div>
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

export default UserDashboard;
