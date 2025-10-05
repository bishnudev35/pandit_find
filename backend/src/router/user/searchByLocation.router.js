import express from "express";
import prisma from "../../lib/db.js";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

// Helper function: Haversine formula
function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
}

router.get("/searchByLocation", authMiddleware, async (req, res) => {
  try {
    const { addressId } = req.query;

    if (!addressId) {
      return res.status(400).json({ error: "addressId is required" });
    }

    // 1. Get user address
    const userAddress = await prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!userAddress || !userAddress.latitude || !userAddress.longitude) {
      return res
        .status(404)
        .json({ error: "User address not found or missing coordinates" });
    }

    const { latitude: userLat, longitude: userLng } = userAddress;

    // 2. Get all pandit locations with pandit, calendar & timeSlots
    const panditLocations = await prisma.location.findMany({
      include: {
        pandit: {
          include: {
            availability: {
              include: {
                timeSlots: true,
              },
              orderBy: { date: "asc" },
            },
          },
        },
      },
    });

    // 3. Filter pandits within 10 km
    const nearbyPandits = panditLocations.filter((loc) => {
      if (loc.latitude && loc.longitude) {
        const distance = haversineDistance(
          userLat,
          userLng,
          loc.latitude,
          loc.longitude
        );
        return distance <= 10;
      }
      return false;
    });

    // 4. Format response
    res.json({
      userLocation: userAddress,
      nearbyPandits: nearbyPandits.map((loc) => ({
        pandit: {
          id: loc.pandit.id,
          name: loc.pandit.name,
          email: loc.pandit.email,
          contactNo: loc.pandit.contactNo,
          services: loc.pandit.services,
          rating: loc.pandit.rating,
          experience: loc.pandit.experience,
          availability: loc.pandit.availability.map((cal) => ({
            id: cal.id,
            date: cal.date,
            timeSlots: cal.timeSlots.map((slot) => ({
              id: slot.id,
              startTime: slot.startTime,
              endTime: slot.endTime,
              status: slot.status,
              bookingId: slot.bookingId,
            })),
          })),
        },
        location: {
          id: loc.id,
          street: loc.street,
          city: loc.city,
          state: loc.state,
          country: loc.country,
          zipCode: loc.zipCode,
          latitude: loc.latitude,
          longitude: loc.longitude,
        },
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
