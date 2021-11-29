import { Request, Response } from 'express';
import { PrismaClient } from '../node_modules/.prisma/client/index';

const prisma = new PrismaClient();

const addNewTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const trip = await prisma.plan.create(req.body);
    res.status(201);
    res.send(trip);
  } catch (err) {
    console.error('error', err);
    res.sendStatus(500);
  }
}

module.exports = {
  addNewTrip
}
