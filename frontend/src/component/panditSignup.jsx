import React from "react";

function PanditSignup(){
    return (
        <div className="space-y-6 p-8">
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
          <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm">
            <option>Wedding Ceremonies</option>
            <option>House Warming</option>
            <option>Religious Rituals</option>
            <option>Astrology</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
        <input 
          type="email" 
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
          placeholder="your.email@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Contact No</label>
        <input 
          type="number" 
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
          placeholder="1234556789"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
        <input 
          type="number" 
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
          placeholder="5"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Create Password</label>
        <input 
          type="password" 
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
          placeholder="Create a secure password"
        />
      </div>
    </div>
    
    <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl">
      Apply as Pandit
    </button>
     {/* Divider */}
              <div className="text-center text-gray-500">Or Continue With</div>

              {/* Social Login Buttons */}
              <div className="flex justify-center gap-4">
                <button className="p-3 border rounded-full hover:bg-gray-100">
                  <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                </button>
                <button className="p-3 border rounded-full hover:bg-gray-100">
                  <img
                    src="https://www.svgrepo.com/show/512317/github-142.svg"
                    alt="GitHub"
                    className="w-5 h-5"
                  />
                </button>
                <button className="p-3 border rounded-full hover:bg-gray-100">
                  <img
                    src="https://www.svgrepo.com/show/448224/facebook.svg"
                    alt="Facebook"
                    className="w-5 h-5"
                  />
                </button>
              </div>
          
    <p className="text-center text-sm text-gray-600">
      Already registered? 
      <a href="#" className="text-purple-500 hover:text-purple-600 font-medium ml-1">Sign in</a>
    </p>
  </div>
    )   
}
export default PanditSignup;