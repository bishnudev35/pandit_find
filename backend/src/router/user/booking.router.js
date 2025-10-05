import express from "express";
import prisma from "../../lib/db.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

function add30Min(dateStr) {
  const date = new Date(dateStr);
  date.setMinutes(date.getMinutes() + 30);
  return date.toISOString();
}

router.post("/booking", authMiddleware, async (req, res) => {
  const { panditId, startTimes, service, date, addressId, payment } = req.body;
  const { userId } = req.user;

  try {
    if (!userId || !panditId || !startTimes || !date || !service || !addressId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const pandit = await prisma.pandit.findUnique({ where: { id: panditId } });
    if (!pandit) return res.status(404).json({ message: "Pandit not found" });

    // ✅ Generate OTP as INTEGER (matches schema: Otp Int)
    const otp = Math.floor(100000 + Math.random() * 900000);

    const sortedTimes = [...startTimes].sort();
    const price = pandit.price || 500;
    const cost = sortedTimes.length * (price / 2);
    const duration = sortedTimes.length * 30;

    const lastTime = new Date(sortedTimes[sortedTimes.length - 1]);
    const nextSlot = add30Min(lastTime);
    if (new Date(nextSlot).getHours() < 21) sortedTimes.push(nextSlot);

    const slots = await prisma.timeSlot.findMany({
      where: {
        startTime: { in: sortedTimes.map((t) => new Date(t)) },
        calendar: { panditId, date: new Date(date) },
      },
    });

    if (slots.length !== sortedTimes.length) {
      return res.status(400).json({ message: "Some slots do not exist in calendar" });
    }

    const unavailable = slots.find((s) => s.status !== "AVAILABLE");
    if (unavailable) {
      return res.status(400).json({ message: `Slot ${unavailable.startTime} not available` });
    }

    // ✅ If payment exists → verify
    if (
      payment &&
      payment.razorpay_order_id &&
      payment.razorpay_payment_id &&
      payment.razorpay_signature
    ) {
      const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
      hmac.update(payment.razorpay_order_id + "|" + payment.razorpay_payment_id);
      const generatedSignature = hmac.digest("hex");

      if (generatedSignature !== payment.razorpay_signature) {
        return res.status(400).json({ message: "Payment verification failed" });
      }

      console.log("✅ Payment verified, creating booking...");

      // ✅ FIXED: Match exact Prisma schema fields
      const booking = await prisma.booking.create({
        data: {
          userId,
          panditId,
          ammount: cost,
          service: service.name, // Extract string from service object
          duration,
          addressId,
          status: "BOOKED",
          Otp: otp, // Integer, not string
          // Note: razorpayOrderId and razorpayPaymentId don't exist in your schema
          // If you need to store these, add them to your schema first
        },
      });

      console.log("✅ Booking created:", booking.id, "OTP:", booking.Otp);

      // ✅ Update time slots
      await prisma.timeSlot.updateMany({
        where: { id: { in: slots.map((s) => s.id) } },
        data: { status: "BOOKED", bookingId: booking.id },
      });

      console.log("✅ Slots updated successfully");

      return res.status(201).json({
        success: true,
        message: "Booking confirmed successfully",
        booking: booking,
      });
    }

    // 🔹 Else → create order for payment
    const razorpayOrder = await razorpay.orders.create({
      amount: cost * 100,
      currency: "INR",
      receipt: `booking_${Date.now()}`,
      payment_capture: 1,
    });

    return res.status(201).json({
      success: true,
      message: "Booking initiated. Complete payment to confirm.",
      amount: cost,
      razorpayOrder,
    });
  } catch (error) {
    console.error("❌ Error:", error.message, error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;