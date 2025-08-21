import express from 'express';
import prisma from '../lib/db.js';
import bcrypt from 'bcrypt'; // Assuming you are using bcrypt for password hashing
import jwtSign from '../util/jwt.js';
const router = express.Router();

router.post("/userLogin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check password (assuming you have a function to verify passwords)
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token=jwtSign(user, process.env.JWT_SECRET);
    return res.status(200).json({
      message: "Login successful",user,token});

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
export default router;