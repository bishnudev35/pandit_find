 import prismaclient from '@prisma/client';

    const { PrismaClient } = prismaclient;
    const prisma = new PrismaClient();
    console.log("db connected successfully")
    export default prisma;