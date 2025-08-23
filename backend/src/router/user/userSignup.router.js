import express from 'express';
import prisma from '../../lib/db.js';
import bcrypt from 'bcrypt'; // Assuming you are using bcrypt for password hashing
import { generateAccessToken,generateRefreshToken } from '../../util/jwt.js';

const router = express.Router();

router.post("/userSignup", async (req, res) => {
   
  const {name,contactNo, email, password } = req.body;

  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (user) {
      return res.status(404).json({ message: "User already exist" });
    }
    const pandit=await prisma.pandit.findUnique({
      where:{email:email},
    })
    if(pandit){
      return res.status(403).json({message:"using this email pandit already exist"})
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);
    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        contactNo,
        email,
        password: hashedPassword,
      },
    });
    // Generate JWT token
    if(!newUser){
        return res.status(500).json({ message: "User creation failed" });
    }
     console.log("djfkjsdhgjkhdsfkjg")
    const accessToken=generateAccessToken({userId:newUser.id},process.env.ACCESS_TOKEN_SECRET);
    const refreshToken=generateRefreshToken({userId:newUser.id},process.env.REFRESH_TOKEN_SECRET);
    return res.status(201).json({
      message: "User created successfully",
      user: {   
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        contactNo: newUser.contactNo,
      },accessToken,
      refreshToken
    });
    } catch (error) {   
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });  
    }
});
export default router;