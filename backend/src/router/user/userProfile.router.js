import express from 'express'
import prisma from '../../lib/db.js'

const router = express.Router();

router.get('/userProfile/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        if (!userId) {
            return res.status(400).json({ error: "userId not found!" });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // ✅ Send proper JSON response
        return res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                contactNo: user.contactNo,
                address:user.address,
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
