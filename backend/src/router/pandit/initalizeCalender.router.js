import express from "express";
import prisma from "../../lib/db.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

// Normalize any incoming date string to start-of-day UTC (00:00:00.000Z)
function normalizeToUTCDate(d) {
  const dt = new Date(d);
  dt.setUTCHours(0, 0, 0, 0);
  return dt;
}

// Generate 30-min slots from 08:00 to 21:00 (9 PM) on the given UTC day
function generateSlotsForDay(dayStartUTC) {
  const slots = [];
  
  const start = new Date(dayStartUTC);
  start.setUTCHours(8, 0, 0, 0);
  
  const end = new Date(dayStartUTC);
  end.setUTCHours(21, 0, 0, 0);
  
  let cursor = start;
  while (cursor < end) {
    const next = new Date(cursor.getTime() + 30 * 60 * 1000);
    slots.push({
      startTime: cursor,
      endTime: next,
      status: "AVAILABLE",
    });
    cursor = next;
  }
  return slots;
}

router.post("/initializeCalendar",authMiddleware, async (req, res) => {
  const {  startDate } = req.body; // startDate: ISO string
  const {panditId}=req.user
  try {
    if (!panditId || !startDate) {
      return res.status(400).json({ message: "Pandit ID and startDate are required" });
    }
    
    // Ensure pandit exists
    const pandit = await prisma.pandit.findUnique({ where: { id: panditId } });
    if (!pandit) {
      return res.status(404).json({ message: "Pandit not found" });
    }
    
    // Normalize incoming start date
    const baseDate = normalizeToUTCDate(startDate);
    
    // Build the next 14 days (including start date)
    const normalizedDates = [];
    for (let i = 0; i < 14; i++) {
      const nextDay = new Date(baseDate);
      nextDay.setUTCDate(baseDate.getUTCDate() + i);
      normalizedDates.push(nextDay);
    }
    
    // Find which calendars already exist
    const existingCalendars = await prisma.calendar.findMany({
      where: {
        panditId,
        date: { in: normalizedDates },
      },
      select: { id: true, date: true },
    });
    
    const existingDateTimestamps = new Set(
      existingCalendars.map((c) => c.date.getTime())
    );
    
    const results = [];
    
    for (const dayStartUTC of normalizedDates) {
      const ts = dayStartUTC.getTime();
      
      if (existingDateTimestamps.has(ts)) {
        results.push({
          date: dayStartUTC,
          status: "skipped_existing",
        });
        continue;
      }
      
      const timeSlots = generateSlotsForDay(dayStartUTC);
      
      try {
        const created = await prisma.calendar.create({
          data: {
            panditId,
            date: dayStartUTC,
            timeSlots: {
              create: timeSlots.map(slot => ({
                startTime: slot.startTime,
                endTime: slot.endTime,
                status: slot.status,
              })),
            },
          },
          include: { timeSlots: true }, // so response includes slots
        });
        
        results.push({
          date: dayStartUTC,
          status: "initialized",
          calendar: created,
        });
      } catch (err) {
        if (err?.code === "P2002") {
          results.push({
            date: dayStartUTC,
            status: "skipped_existing",
          });
        } else {
          throw err;
        }
      }
    }
    
    return res.status(201).json({
      message: "Calendars processed for 14 days",
      results,
    });
  } catch (error) {
    console.error("Error initializing calendars:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
