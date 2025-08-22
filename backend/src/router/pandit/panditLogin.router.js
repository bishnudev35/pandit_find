import express from 'express';
import bcrypt from 'bcrypt'; // Assuming you are using bcrypt for password hashing
import jwtSign from '../../util/jwt.js';
import prisma from '../../lib/db.js'

const router=express.Router();

router.post('/panditLogin',async(req,res)=>{
    const {email,password,panditId}=req.body;
    try{
        
        if(!email || !password ){
            return res.status(400).json({message:"Email, password and panditId are required"});
        }
        // Find pandit by email
        const pandit = await prisma.pandit.findUnique({
            where: { email: email },
        });
        if (!pandit) {
            return res.status(404).json({ message: "Pandit not found" });
        }
        // Check password
        const isPasswordValid = bcrypt.compareSync(password, pandit.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
       
        // Generate JWT token
        const token = jwtSign(pandit, process.env.JWT_SECRET);
        return res.status(200).json({
            message: "Login successful",
            pandit: {
                id: pandit.id,
                name: pandit.name,
                email: pandit.email,
                contactNo: pandit.contactNo,
            },
            token
        });
    }
    catch(error){
        console.error("Login error:", error);
        return res.status(500).json({ message: "Internal server error" });  
    }
})
export default router;