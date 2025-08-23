import express from 'express';
import prisma from '../../lib/db.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get("/allBooking/:userId",authMiddleware, async (req, res) => { 
    const { userId } =req.user;
    try {
        if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
        }
        const user = await prisma.user.findUnique({
        where: { id: userId },
        });
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }
          const bookings = await prisma.booking.findMany({
      where: { userId },
      select: {
        id: true,
        userId: true,
        panditId: true,
        duration: true,
        service: true,
        feedback: true,
        status: true,
        Otp : true,

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
            .json({ message: "No bookings found for this user" });
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