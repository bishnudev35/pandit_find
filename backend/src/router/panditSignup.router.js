import express from 'express';
import bcrypt from 'bcrypt'; // Assuming you are using bcrypt for password hashing
import jwtSign from '../util/jwt.js';
import prisma from '../lib/db.js';

const router = express.Router();

router.post('/panditSignup', async (req, res) => {
    const { name, contactNo, email, password,experience } = req.body;


    try {
        if (!name || !contactNo || !email || !password ||!experience) {
            return res.status(400).json({ message: "Name, contact number, email, and password are required" });
        }
        // Find pandit by email
        const pandit = await prisma.pandit.findUnique({
            where: { email: email },
        });
       const user = await prisma.user.findUnique({
            where: { email: email },
        });
        if (user) {
            return res.status(404).json({ message: "using this email User already exists" });}

        if (pandit) {
            return res.status(404).json({ message: "Pandit already exists" });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);
        
        // Create new pandit
        const newPandit = await prisma.pandit.create({
            data: {
                name,
                contactNo,
                email,
                experience,
                password: hashedPassword,
            },
        });

        // Generate JWT token
        if (!newPandit) {
            return res.status(500).json({ message: "Pandit creation failed" });
        }
        
        const token = jwtSign(newPandit, process.env.JWT_SECRET);
        
        return res.status(201).json({
            message: "Pandit created successfully",
            pandit: {
                id: newPandit.id,
                name: newPandit.name,
                email: newPandit.email,
                contactNo: newPandit.contactNo,
            },
            token
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
export default router;