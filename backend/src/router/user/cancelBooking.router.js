import express from "express";
import prisma from "../../lib/db.js";

const router = express.Router();

router.post("/cancelBooking", async (req, res) => {
    const { bookingId, feedback } = req.body;
    try {
        if (!bookingId) {
            return res.status(400).json({ message: "Booking ID is required" });
        }

        // Check if the booking exists
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { timeSlots: true }, // Assuming relation booking -> timeSlots
        });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Update the booking status to CANCELLED
        const updatedBooking = await prisma.booking.update({
            where: { id: bookingId },
            data: {
                status: "CANCELLED",
                feedback: feedback || null, // Optional feedback
            },
        });

        // Mark all related timeslots as AVAILABLE again
        if (booking.timeSlots && booking.timeSlots.length > 0) {
            await prisma.timeSlot.updateMany({
                where: {
                    id: {
                        in: booking.timeSlots.map((slot) => slot.id),
                    },
                },
                data: {
                    status: "AVAILABLE",
                },
            });
        }

        return res.status(200).json({
            message: "Booking cancelled successfully & timeslots released",
            booking: updatedBooking,
        });
    } catch (error) {
        console.error("Error cancelling booking:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
