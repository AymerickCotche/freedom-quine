import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return await addtirage(req, res)
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false })
  }
}


async function addtirage(req, res) {
  try {
    const newTirage = await prisma.tirage.create({
      data: {}
    }); 
    return res.status(200).json(newTirage, {success: true});
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured." });
  }
};