import React, { useEffect, useState } from "react";
import { User, Bell, Calendar, Info, Home, Phone } from "lucide-react";

function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userData, setUserData] = useState(null);

  // Dummy notifications
  const notifications = [
    { id: 1, message: "Booking confirmed for tomorrow's Ganesh Puja", time: "2 hours ago", unread: true },
    { id: 2, message: "New pandit available in your area", time: "5 hours ago", unread: true },
    { id: 3, message: "Payment successful for Satyanarayan Katha", time: "1 day ago", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken")
        if (!token) {
          console.warn("No access token found, user may not be logged in.");
          return;
        }

        const response = await fetch("http://localhost:5400/api/v1/user/userProfile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": `${token}`,
            "x-refresh-token": `${refreshToken}` // send token
          },
          credentials: "include", // to also send cookies if refreshToken stored in cookies
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setUserData(data.user || data); // adjust based on backend response
      } catch (error) {
        console.error("Error during profile fetching:", error);
      }
    };

    fetchProfile();
  }, []);

  // toggle functions
  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu((prev) => !prev);
    setShowNotifications(false);
  };

  return (
    <header className="bg-gradient-to-r from-orange-50 to-red-50 shadow-lg border-b-2 border-orange-300 sticky top-0 z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Navigation */}
          <div className="flex items-center space-x-3">
            <div className="text-3xl animate-pulse">🕉️</div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                PanditConnect
              </h1>
              <p className="text-xs text-orange-600 font-medium">Connecting Faith & Tradition</p>
            </div>
            <nav className="hidden md:flex items-center space-x-8 ml-15">
              <a href="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 font-medium py-2 px-3 rounded-lg hover:bg-orange-50">
                <Home className="w-5 h-5" />
                <span>Home</span>
              </a>
               <a href="/address" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 font-medium py-2 px-3 rounded-lg hover:bg-orange-50">
                <Phone className="w-5 h-5" />
                <span>Book Your Pandit</span>
              </a>
              <a href="/all-bookings" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 font-medium py-2 px-3 rounded-lg hover:bg-orange-50">
                <Calendar className="w-5 h-5" />
                <span>My Bookings</span>
              </a>
              <a href="/about" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 font-medium py-2 px-3 rounded-lg hover:bg-orange-50">
                <Info className="w-5 h-5" />
                <span>About Us</span>
              </a>
              <a href="#contact" className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 font-medium py-2 px-3 rounded-lg hover:bg-orange-50">
                <Phone className="w-5 h-5" />
                <span>Contact</span>
              </a>
              
            </nav>
          </div>

          {/* Right: Notifications + Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="relative p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-100 rounded-full transition-all"
              >
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-orange-200 z-50">
                  <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-red-50">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 border-b border-gray-100 hover:bg-orange-50 transition-colors ${notif.unread ? "bg-blue-50" : ""}`}
                      >
                        <p className="text-sm text-gray-800 font-medium">{notif.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 p-2 hover:bg-orange-100 rounded-xl transition-all"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-md">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-gray-800">
                    {userData ? userData.name : "Guest"}
                  </p>
                  <p className="text-xs text-gray-600">
                    {userData ? userData.location : "Not Available"}
                  </p>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-orange-200 z-50">
                  <div className="p-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-red-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                        <User className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {userData ? userData.name : "Guest User"}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {userData ? userData.email : "No email"}
                        </p>
                        <p className="text-xs text-orange-600">
                          {userData ? userData.location : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <button className="w-full text-left p-2 hover:bg-orange-50 rounded-lg text-sm">
                      Profile Settings
                    </button>
                    <button className="w-full text-left p-2 hover:bg-orange-50 rounded-lg text-sm">
                      Payment Methods
                    </button>
                    <button className="w-full text-left p-2 hover:bg-orange-50 rounded-lg text-sm">
                      Help & Support
                    </button>
                    <hr className="my-2" />
                    <button className="w-full text-left p-2 hover:bg-red-50 rounded-lg text-sm text-red-600">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
