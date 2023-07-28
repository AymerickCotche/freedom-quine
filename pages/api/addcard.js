import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return await addcards(req, res)
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false })
  }
}


async function addcards(req, res) {
  const body = JSON.parse(req.body);
  try {
    const newCard = await prisma.card.create({
      data: {
        cardNumber: body.cardNumber,
        playedNumber: body.playedNumber
      }
    });
    
    return res.status(200).json(newCard, {success: true});
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured." });
  }
};