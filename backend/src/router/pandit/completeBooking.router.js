import express from 'express';
import prisma from '../../lib/db.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();
router.post('/completeBooking',authMiddleware, async (req, res) => {   

    const {bookingId,otp} = req.body;
    try {
        if(!bookingId || !otp) {
            return res.status(400).json({ message: "Booking ID and OTP are required" });
        }
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },   
           
    })
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Check if the OTP matches
        if (booking.Otp !== otp) {
            return res.status(401).json({ message: "Invalid OTP" });
        }

        // Update the booking status to COMPLETED
        const updatedBooking = await prisma.booking.update({
            where: { id: bookingId },
            data: {
                status: "COMPLETED",
            },
        });

        return res.status(200).json({
            message: "Booking completed successfully",
            booking: updatedBooking,
        });
    }
    catch (error) {
        console.error("Error in completeBooking:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
export default router;

