import express from 'express';
import prisma from '../../lib/db.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();
router.get('/panditProfile',authMiddleware, async (req, res) => {
    const { panditId } = req.user;

    try {
        // Find pandit by ID
        const pandit = await prisma.pandit.findUnique({
            where: { id:panditId },
        });

        if (!pandit) {
            return res.status(404).json({ message: "Pandit not found" });
        }

        return res.status(200).json({
            message: "Pandit profile retrieved successfully",
            pandit: {
                id: pandit.id,
                name: pandit.name,
                email: pandit.email,
                contactNo: pandit.contactNo,
                experience: pandit.experience,
                rating: pandit.rating,
                services: pandit.services, // Include services if necessary
                // Add other fields as necessary
            }
        });
    } catch (error) {
        console.error("Error retrieving pandit profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
export default router;
