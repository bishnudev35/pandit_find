import React,{useState} from "react";
import { User, Crown, CheckCircle, Calendar, Clock } from "lucide-react";
import UserLogin from "./component/userLogin";
import PanditLogin from "./component/panditLogin";
function Login() {
      const [role, setRole] = useState("user"); // default role
     
       const handleRoleChange = (newRole) => {
         setRole(newRole);}
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen ">
 <div className="text-3xl font-bold mb-8 text-center">
      Welcome to the Login Page
 </div>
     <div className="bg-white/30 backdrop-blur-lg w-full max-w-4/6 rounded-4xl shadow-lg flex md:flex-row overflow-hidden">
        {/* Left Side */}
        <div className="md:w-3/5 flex flex-col justify-center p-8">
          {/* Role Selector */}
          <div className="mb-2">
            <div className="flex gap-2 ml-11 mr-37 bg-gray-100/50 rounded-2xl backdrop-blur-sm">
              <button
                onClick={() => handleRoleChange("user")}
                className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  role === "user"
                    ? "bg-gradient-to-r from-orange-400 to-red-500 text-white shadow-lg transform scale-[1.02]"
                    : "text-gray-600 hover:bg-white/50"
                }`}
              >
                <User className="w-5 h-5" />
                <span>Devotee</span>
              </button>

              <button
                onClick={() => handleRoleChange("pandit")}
                className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  role === "pandit"
                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg transform scale-[1.02]"
                    : "text-gray-600 hover:bg-white/50"
                }`}
              >
                <Crown className="w-5 h-5" />
                <span>Pandit</span>
              </button>
            </div>
          </div>

          {/* Conditional Forms */}
          {role === "user" && <UserLogin />}
          {role === "pandit" && (
           <PanditLogin />
          )}
        </div>



        
         <div className="hidden md:flex w-1/2 items-center justify-center bg-transparent">
          <img
            src="mainMonk.png"
            alt="Main Monk"
            className="drop-shadow-lg max-h-[500px]"
          />
        </div>
    
      </div>
    </div>
  );
}
export default Login;
