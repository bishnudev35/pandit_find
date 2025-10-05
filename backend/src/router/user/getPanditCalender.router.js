import express from "express";
import prisma from "../../lib/db.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Get Pandit Calendar and Time Slots
router.get("/getCalendar/:panditId", authMiddleware, async (req, res) => {
  const { panditId } = req.params; // ✅ FIXED: use params, not req.user

  try {
    if (!panditId) {
      return res.status(400).json({ message: "Pandit ID is required" });
    }

    // ✅ Find pandit (ensure exists)
    const pandit = await prisma.pandit.findUnique({
      where: { id: panditId },
      include: {
        availability: {
          include: {
            timeSlots: true, // fetch all slots per date
          },
        },
      },
    });

    if (!pandit) {
      return res.status(404).json({ message: "Pandit not found" });
    }

    // ✅ If no calendar data
    if (!pandit.availability || pandit.availability.length === 0) {
      return res
        .status(404)
        .json({ message: "No calendar data found for this pandit" });
    }

    // ✅ Send response
    return res.status(200).json({
      message: "Calendar and time slots retrieved successfully",
      calendar: pandit.availability,
    });
  } catch (error) {
    console.error("❌ Error retrieving calendar:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
