import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return await getCards(req, res)
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false })
  }
}

const transformNum = (numString) => {
  const formattedNumeros = []
  const numArray = numString.split(',')
  for (const num of numArray) {
    formattedNumeros.push({
      value: num,
      drawn: false
    })
  }
  return formattedNumeros 

}

async function getCards(req, res) {
  const body = req.body;
  try {
    const result = await prisma.card.findMany();
    const formatedResult = result.map(card => ({
      id: card.id,
      cardNumber: card.cardNumber,
      playedNumber: transformNum(card.playedNumber),
      numManquant: card.numManquant
    }))
    res.status(200).json(formatedResult);
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Error occured." });
  }
};