import React from "react";

function PanditLogin() {
  return (
   <div className="backdrop-blur-lg rounded-2xl shadow-lg p-8 ml-12  mb-8 bg-white/30 max-w-4/6">
            <h2
              className="text-[#F97316] text-lg font-semibold"
            >
              Your logo
            </h2>
            <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>

            <form className="space-y-2">
              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="username@gmail.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
            {/* pandit id*/}
                <div>
                    <input
                    type="text"
                    placeholder="Pandit ID"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                    /></div>
              {/* Password */}
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
                />
                <div className="text-right mt-1">
                  <a
                    href="#"
                    className="text-sm text-orange-500 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              {/* Sign in Button */}
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Sign in
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
            </form>

            {/* Register Link */}
            <p className="mt-5 text-center text-gray-600">
              Don’t have an account yet?{" "}
              <a href="#" className="text-orange-500 font-semibold">
                Register for free
              </a>
            </p>
          </div>
  );
}
export default PanditLogin;