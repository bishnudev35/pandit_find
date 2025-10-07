import  { useEffect } from "react";
import Header from "./header/header";
import ShowCalender from "./component/showCalender";

function Availability() {
  useEffect(() => {
    const createCalendar = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (!accessToken || !refreshToken) {
          console.error("Authentication tokens not found. Please log in again.");
          return;
        }

        // current date in ISO format (frontend sends as `startDate`)
        const currentDate = new Date().toISOString();

        const response = await fetch("http://localhost:5400/api/v1/pandit/initializeCalendar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: accessToken,
            "x-refresh-token": refreshToken,
          },
          body: JSON.stringify({
            startDate: currentDate, // ✅ required parameter for backend
          }),
          credentials: "include",
        });

        if (!response.ok) {
          const errData = await response.json();
          console.error("Failed to initialize calendar:", errData.message);
          return;
        }

        const data = await response.json();
        console.log("Calendar initialized successfully:", data);
      } catch (error) {
        console.error("Error initializing calendar:", error);
      }
    };

    createCalendar();
  }, []);

  return <div>
    <Header />
    
    <ShowCalender />
  </div>;
}

export default Availability;
