
import express from 'express';
import prisma from '../../lib/db.js';

const router = express.Router();
router.post('/timeAvailable', async (req, res) => {
    const { panditId, date, startTimes } = req.body;
    // startTimes = [ "2025-08-21T08:00:00.000Z", "2025-08-21T08:30:00.000Z", ... ]
    try {
        if (!panditId || !date || !Array.isArray(startTimes) || startTimes.length === 0) {
            return res.status(400).json({ message: "Pandit ID, date, and startTimes array are required" });
        }

        // Check if the pandit exists
        const pandit = await prisma.pandit.findUnique({
            where: { id: panditId },
        });

        if (!pandit) {
            return res.status(404).json({ message: "Pandit not found" });
        }

        // Find the calendar for that date
        const calendar = await prisma.calendar.findFirst({
            where: {
                panditId,
                date: new Date(date),
            },
        });

        if (!calendar) {
            return res.status(404).json({ message: "Calendar not found for this date" });
        }

        // Update all matching time slots
        const updated = await prisma.timeSlot.updateMany({
            where: {
                calendarId: calendar.id,
                startTime: { in: startTimes.map(s => new Date(s)) },
            },
            data: { status: "AVAILABLE" },
        });

        return res.status(200).json({
            message: "Now time slots set to available successfully",
            count: updated.count,
        });
    } catch (error) {
        console.error("Error blocking time slots:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
export default router;