import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return await getTirages(req, res)
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false })
  }
}

async function getTirages(req, res) {
  const data = req.body;
  try {
    const result = await prisma.tirage.findMany();
    const formatedResult = result.map(tirage => ({
      id: tirage.id,
      name: tirage.name,
      value: tirage.value ? tirage.value.split(',') : []
    }))
    res.status(200).json(formatedResult);
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured." });
  }
};