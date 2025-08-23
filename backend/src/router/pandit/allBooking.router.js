import express from "express";
import prisma from "../../lib/db.js";
import authMiddleware from "../../middleware/authMiddleware.js";


const router = express.Router();
router.get("/allBooking/:panditId",authMiddleware, async (req, res) => {
  const { panditId } = req.user;
  try {
    if (!panditId) {
      return res.status(400).json({ message: "Pandit ID is required" });
    }
    const pandit = await prisma.pandit.findUnique({
      where: { id: panditId },
    });
    if (!pandit) {
      return res.status(404).json({ message: "Pandit not found" });
    }
    const bookings = await prisma.booking.findMany({
      where: { panditId },
      select: {
        id: true,
        userId: true,
        panditId: true,
        duration: true,
        service: true,
        feedback: true,
        status: true,

        user: {
          select: {
            id: true,
            name: true,
            email: true,
            contactNo: true,
          },
        },
        address: {
          select: {
            id: true,
            street: true,
            city: true,
            state: true,
            country: true,
            zipCode: true,
          },
        },
        timeSlots: true,
      },
    });

    if (!bookings) {
      return res
        .status(404)
        .json({ message: "No bookings found for this pandit" });
    }

    return res.status(200).json({
      message: "Bookings retrieved successfully",
      bookings: bookings,
    });
  } catch (error) {
    console.error("Error in allBooking:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
export default router;
