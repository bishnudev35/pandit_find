import express from "express";
import prisma from "../../lib/db.js";
import axios from "axios";
import authMiddleware from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/userAddress", authMiddleware, async (req, res) => {
  const { address } = req.body;
  const { userId } = req.user;

  try {
    if (
      !userId ||
      !address ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.country ||
      !address.zipCode
    ) {
      return res
        .status(400)
        .json({ message: "User ID and complete address are required" });
    }

    // ✅ Check user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Check if same address already exists for this user
    const existingAddress = await prisma.address.findFirst({
      where: {
        userId,
        street: address.street,
        city: address.city,
        state: address.state,
        country: address.country,
        zipCode: address.zipCode,
      },
    });

    if (existingAddress) {
      return res.status(200).json({
        message: "Address already exists for this user",
        address: existingAddress,
      });
    }

    // ✅ Build full address string
    const fullAddress = `${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.zipCode}`;

    // ✅ Call Google Maps Geocoding API
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: fullAddress,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
      }
    );

    if (response.data.status !== "OK") {
      return res.status(400).json({ message: "Failed to fetch coordinates" });
    }

    const { lat, lng } = response.data.results[0].geometry.location;

    // ✅ Save new address with lat/lng
    const newAddress = await prisma.address.create({
      data: {
        userId,
        street: address.street,
        city: address.city,
        state: address.state,
        country: address.country,
        zipCode: address.zipCode,
        latitude: lat,
        longitude: lng,
      },
    });

    return res.status(201).json({
      message: "New address added successfully",
      address: newAddress,
    });
  } catch (error) {
    console.error("Error adding user address:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
