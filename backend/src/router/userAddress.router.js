import express from "express";
import prisma from "../lib/db.js";

const router = express.Router();

router.post("/userAddress", async (req, res) => {
  const { userId, address } = req.body;

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
    const user = await prisma.user.findUnique({
      where: { id: userId },    
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Create a new address
    const newAddress = await prisma.address.create({
      data: {
        userId,
        street: address.street,
        city: address.city,
        state: address.state,
        country: address.country,
        zipCode: address.zipCode,
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
