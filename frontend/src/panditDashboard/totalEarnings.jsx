import React, { useMemo } from "react";
import Header from "./header/header";
import { Wallet, Calendar, TrendingUp, PiggyBank } from "lucide-react";

function Earnings() {
  // Dummy booking payments
  const today = new Date();
  const bookings = [
    {
      id: 1,
      date: new Date(), // today
      amount: 1500,
    },
    {
      id: 2,
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2), // 2 days ago
      amount: 3000,
    },
    {
      id: 3,
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6), // 6 days ago
      amount: 2000,
    },
    {
      id: 4,
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 12), // last week
      amount: 5000,
    },
    {
      id: 5,
      date: new Date(today.getFullYear(), today.getMonth(), 1), // this month start
      amount: 2500,
    },
  ];

  // Calculations
  const earnings = useMemo(() => {
    const todayStr = today.toDateString();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    let todayTotal = 0,
      weekTotal = 0,
      monthTotal = 0,
      companyTotal = 0;

    bookings.forEach((b) => {
      const bookingDate = new Date(b.date);

      // Today
      if (bookingDate.toDateString() === todayStr) {
        todayTotal += b.amount;
      }
      // This week
      if (bookingDate >= startOfWeek) {
        weekTotal += b.amount;
      }
      // This month
      if (bookingDate >= startOfMonth) {
        monthTotal += b.amount;
      }
      // Total received from company (all bookings)
      companyTotal += b.amount;
    });

    return { todayTotal, weekTotal, monthTotal, companyTotal };
  }, [bookings]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="mt-8 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Total Earnings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Today */}
          <div className="bg-white rounded-2xl shadow-md border border-orange-100 p-6 hover:shadow-lg transition">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Wallet className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Today’s Earnings</p>
                <h3 className="text-xl font-bold text-gray-800">
                  ₹{earnings.todayTotal}
                </h3>
              </div>
            </div>
          </div>

          {/* This Week */}
          <div className="bg-white rounded-2xl shadow-md border border-blue-100 p-6 hover:shadow-lg transition">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">This Week</p>
                <h3 className="text-xl font-bold text-gray-800">
                  ₹{earnings.weekTotal}
                </h3>
              </div>
            </div>
          </div>

          {/* This Month */}
          <div className="bg-white rounded-2xl shadow-md border border-green-100 p-6 hover:shadow-lg transition">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">This Month</p>
                <h3 className="text-xl font-bold text-gray-800">
                  ₹{earnings.monthTotal}
                </h3>
              </div>
            </div>
          </div>

          {/* Company Total */}
          <div className="bg-white rounded-2xl shadow-md border border-purple-100 p-6 hover:shadow-lg transition">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-xl">
                <PiggyBank className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Payment Received</p>
                <h3 className="text-xl font-bold text-gray-800">
                  ₹{earnings.companyTotal}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Recent transactions (dummy) */}
        <div className="mt-10 bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Recent Transactions
          </h3>
          <div className="space-y-3">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between border-b border-gray-100 pb-2"
              >
                <span className="text-gray-600">
                  {new Date(b.date).toLocaleDateString("en-IN")}
                </span>
                <span className="font-bold text-gray-800">₹{b.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Earnings;
