import { Request, Response } from 'express';
import { PrismaClient } from '../node_modules/.prisma/client/index';

const prisma = new PrismaClient();

const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.create({data: req.body});
    res.status(200);
    res.send(user);
  } catch (err) {
    console.error('error', err);
    res.sendStatus(500);
  }
}

const getLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findMany({ 
      where: {
        username: username, password: password
      },
      include: {
        plans: true,
        journals: true,
        notes: true
      }
  });
    res.status(200);
    res.send(user);
  } catch (err) {
    console.error('error', err);
    res.sendStatus(500);
  }
}

const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = +req.params.id;
    const user = await prisma.user.findUnique({ 
      where: {
        id: id
      },
      select: {
        firstName: true, 
        lastName: true, 
        interests: true
      }
  });
    res.status(200);
    res.send(user);
  } catch (err) {
    console.error('error', err);
    res.sendStatus(500);
  }
}

const addNewTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const trip = await prisma.plan.create({data: req.body});
    res.status(201);
    res.send(trip);
  } catch (err) {
    console.error('error', err);
    res.sendStatus(500);
  }
}

const getPersonalTrips = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = +req.params.id;
    const user = await prisma.user.findUnique({ 
      where: {
        id: id
      },
      select: {
        plans: true,
      }
  });
    res.status(200);
    res.send(user);
  } catch (err) {
    console.error('error', err);
    res.sendStatus(500);
  }
}

const updateTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = +req.params.id;
    const trip = await prisma.plan.update({ 
      data: req.body, 
      where: {
        id: id
      }
    });
    res.status(200);
    res.send(trip);
  } catch (err) {
    console.error('error', err);
    res.sendStatus(500);
  }
}

const deleteTrip = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = +req.params.id;
    await prisma.plan.delete({
      where: {
        id: id
      }
    });
    res.sendStatus(204);
  } catch (err) {
    console.error('error', err);
    res.sendStatus(500);
  }
}

const addNewJournal = async (req: Request, res: Response): Promise<void> => {
  try {
    const trip = await prisma.journal.create({data: req.body});
    res.status(201);
    res.send(trip);
  } catch (err) {
    console.error('error', err);
    res.sendStatus(500);
  }
}

const getPersonalJournals = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = +req.params.id;
    const user = await prisma.user.findUnique({ 
      where: {
        id: id
      },
      select: {
        journals: true
      }
  });
    res.status(200);
    res.send(user);
  } catch (err) {
    console.error('error', err);
    res.sendStatus(500);
  }
}

const updateJournal = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = +req.params.id;
    const trip = await prisma.journal.update({ 
      data: req.body, 
      where: {
        id: id
      }
    });
    res.status(200);
    res.send(trip);
  } catch (err) {
    console.error('error', err);
    res.sendStatus(500);
  }
}

const deleteJournal = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = +req.params.id;
    await prisma.journal.delete({
      where: {
        id: id
      }
    });
    res.sendStatus(204);
  } catch (err) {
    console.error('error', err);
    res.sendStatus(500);
  }
}

const addNewNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const trip = await prisma.note.create({data: req.body});
    res.status(201);
    res.send(trip);
  } catch (err) {
    console.error('error', err);
    res.sendStatus(500);
  }
}

const getPersonalNotes = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = +req.params.id;
    const user = await prisma.user.findUnique({ 
      where: {
        id: id
      },
      select: {
        notes: true
      }
  });
    res.status(200);
    res.send(user);
  } catch (err) {
    console.error('error', err);
    res.sendStatus(500);
  }
}

const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = +req.params.id;
    await prisma.note.delete({
      where: {
        id: id
      }
    });
    res.sendStatus(204);
  } catch (err) {
    console.error('error', err);
    res.sendStatus(500);
  }
}

const getPublicJournals = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findMany({ 
      select: {
        journals: true
      }   
  });
    res.status(200);
    res.send(user);
  } catch (err) {
    console.error('error', err);
    res.sendStatus(500);
  }
}

module.exports = {
  signUp,
  getLogin,
  getProfile,
  addNewTrip,
  getPersonalTrips,
  updateTrip,
  deleteTrip,
  addNewJournal,
  getPersonalJournals,
  updateJournal,
  deleteJournal,
  addNewNote,
  getPersonalNotes,
  deleteNote,
  getPublicJournals
}
