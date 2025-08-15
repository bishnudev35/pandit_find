import React,{useState} from "react";
import UserLogin from "../component/UserLogin.jsx";
import PanditLogin from "../component/PanditLogin.jsx";

function Login() {
      const [role, setRole] = useState("user"); // default role
      const handleRoleChange = (e) => setRole(e.target.value);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen ">
 <div className="text-3xl font-bold mb-8 text-center">
      Welcome to the Login Page
 </div>
      <div className="bg-white/30 backdrop-blur-lg w-full max-w-4/6 rounded-4xl shadow-lg flex  md:flex-row overflow-hidden">
        {/* Left Side - Login Form */}
        <div className=" md:w-1/2 flex flex-col justify-center">
        {/* Role Selector */}
          <div className="flex items-center justify-center p-2 ml-29">
            <select
              value={role}
              onChange={handleRoleChange}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400"
            >
              <option value="pandit">Login as Pandit</option>
              <option value="user">Login as User</option>
             
            </select>
          </div>
         
          {role === "user" &&(
                <UserLogin/>
          )}
           {/* Other Roles */}
          {role === "pandit" && (
            <PanditLogin />
          )}
          
        </div>

        {/* Right Side - Monk Image */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-transparent">
          <img src="mainMonk.png" alt="Main Monk" className=" drop-shadow-lg" />
        </div>
      </div>
    </div>
  );
}
export default Login;
