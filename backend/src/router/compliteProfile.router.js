import express from 'express';
import prisma from '../lib/db.js';

const router = express.Router();

router.post('/completePanditProfile', async (req, res) => {
  const { panditId, name, contactNo, services, experience, address } = req.body;
  // address should be: { street, city, state, country, zipCode }

  try {
    if (!panditId || !name || !contactNo || !services || !experience || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }
   const fullAddress = `${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.zipCode}`;
    // Call Google Maps Geocoding API
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: fullAddress,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      }
    );
    console.log(response.data);
    if (response.data.status !== "OK") {
    return res.status(400).json({ message: "Failed to fetch coordinates" });
    }

    const { lat, lng } = response.data.results[0].geometry.location;


    // Update pandit details
    const updatedPandit = await prisma.pandit.update({
      where: { id: panditId },
      data: {
        name,
        contactNo,
        services,
        experience,
        address: {
          upsert: {
            update: {
              street: address.street,
              city: address.city,
              state: address.state,
              country: address.country,
              zipCode: address.zipCode,
              latitude: lat,
              longitude: lng,
            },
            create: {
              street: address.street,
              city: address.city,
              state: address.state,
              country: address.country,
              zipCode: address.zipCode,
              latitude: lat,
              longitude: lng,
            },
          },
        },
      },
      include: { address: true },
    });

    return res.status(200).json({
      message: "Pandit profile updated successfully",
      pandit: updatedPandit,
    });
  } catch (error) {
    console.error("Pandit profile update error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
