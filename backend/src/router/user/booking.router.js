import express from "express";
import prisma from "../../lib/db.js";

const router = express.Router();

// Utility: add 30 mins to a given time
function add30Min(dateStr) {
  const date = new Date(dateStr);
  date.setMinutes(date.getMinutes() + 30);
  return date.toISOString();
}

router.post("/booking", async (req, res) => {
  const { userId, panditId, startTimes, service, date, addressId } = req.body;

  try {
    // 1. Validate input
    if (!userId || !panditId || !startTimes || !date || !service || !addressId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 2. Check if user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 3. Check if pandit exists
    const pandit = await prisma.pandit.findUnique({ where: { id: panditId } });
    if (!pandit) return res.status(404).json({ message: "Pandit not found" });
   
    const otp = Math.floor(100000 + Math.random() * 900000);
     console.log(otp); // Example: 483729
// Generate a 4-digit OTP
    // 4. Sort startTimes
    const sortedTimes = [...startTimes].sort();

    // 5. Calculate cost (half price per 30min slot)
    const cost = sortedTimes.length * (service.price / 2);

    // 6. Duration in minutes
    const duration = sortedTimes.length * 30;

    // 7. Optionally add next slot if before 21:00
    const lastTime = new Date(sortedTimes[sortedTimes.length - 1]);
    const nextSlot = add30Min(lastTime);
    if (new Date(nextSlot).getHours() < 21) {
      sortedTimes.push(nextSlot);
    }

    // 8. Fetch slots from DB via Calendar relation
    const slots = await prisma.timeSlot.findMany({
      where: {
        startTime: { in: sortedTimes.map((t) => new Date(t)) },
        calendar: {
          panditId,
          date: new Date(date),
        },
      },
    });

    // 9. Check if all requested slots exist & available
    if (slots.length !== sortedTimes.length) {
      return res
        .status(400)
        .json({ message: "Some slots do not exist in calendar" });
    }
    const unavailable = slots.find((s) => s.status !== "AVAILABLE");
    if (unavailable) {
      return res
        .status(400)
        .json({ message: `Slot ${unavailable.startTime} not available` });
    }

    // 10. Create booking
    const booking = await prisma.booking.create({
      data: {
        userId,
        panditId,
        service: service.name,
        duration,
        addressId,
        status: "BOOKED",
        Otp: otp,
      },
    });

    // 11. Mark slots as BOOKED & link to booking
    await prisma.timeSlot.updateMany({
      where: { id: { in: slots.map((s) => s.id) } },
      data: { status: "BOOKED", bookingId: booking.id },
    });

    // 12. Refetch booking with linked slots
    const bookingWithSlots = await prisma.booking.findUnique({
      where: { id: booking.id },
      include: { timeSlots: true },
    });

    return res.status(201).json({
      message: "Booking successful",
      cost,
      booking: bookingWithSlots,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
