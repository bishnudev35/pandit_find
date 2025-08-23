import express from 'express';
import prisma from '../../lib/db.js';

const router = express.Router();

router.get('/reputedPandit', async (req, res) => {
  try {
    const reputedPandits = await prisma.pandit.findMany({
      where: {
        experience: {
          gt: 5   // Pandits with more than 5 years of experience
        }
      },
      orderBy: {
        rating: 'desc' // Sort by rating instead of reputation
      },
      take: 20, // Top 20 only
      select: {
        id: true,
        name: true,
        email: true,
        contactNo: true,
        services: true,
        rating: true,
        experience: true,
        address: true,
        
        // password, createdAt, updatedAt, bookings are NOT selected
      }
    });

    res.status(200).json(reputedPandits);
  } catch (error) {
    console.error("Error fetching reputed pandits:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
