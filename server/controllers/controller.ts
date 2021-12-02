import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const checkUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { uid, userName, photoURL, email } = req.body;
		const data = {
			uid,
			username: userName,
			photoURL,
			email
		};
		let user = await prisma.user.upsert({
			where: {
				uid,
			},
			update: data,
			create: data,
		});

		if (user === null) {
			user = await prisma.user.create({ data });
		}
		res.status(200);
		res.send(user);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const getLogin = async (req: Request, res: Response): Promise<void> => {
	try {
		const { uid } = req.body;
		const user = await prisma.user.findMany({
			where: {
				uid
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
};

const getProfile = async (req: Request, res: Response): Promise<void> => {
	try {
		const uid = req.params.uid;
		const user = await prisma.user.findUnique({
			where: {
				uid
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
};

const addNewTrip = async (req: Request, res: Response): Promise<void> => {
	try {
		const trip = await prisma.plan.create({ data: req.body });
		res.status(201);
		res.send(trip);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const getPersonalTrips = async (req: Request, res: Response): Promise<void> => {
	try {
		const uid = req.params.uid;
		const user = await prisma.user.findUnique({
			where: {
				uid
			},
			select: {
				plans: true
			}
		});
		res.status(200);
		res.send(user);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

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
};

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
};

const addNewJournal = async (req: Request, res: Response): Promise<void> => {
	try {
		const { uid } = req.params;
		const { review } = req.body;
		const trip = await prisma.user.update({
			where: {
				uid
			},
			data: {
				journals: {
					create: {
						review
					}
				}
			}
		});
		res.status(201);
		res.send(trip);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const getPersonalJournals = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const uid = req.params.uid;
		const user = await prisma.user.findUnique({
			where: {
				uid
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
};

const updateJournal = async (req: Request, res: Response): Promise<void> => {
	try {
		const { uid, id } = req.params;
		const { review } = req.body;
		const trip = await prisma.user.update({
			where: {
				uid
			},
			data: {
				journals: {
					update: {
						where: {
							id: Number(id)
						},
						data: {
							review
						}
					}
				}
			}
		});
		res.status(200);
		res.send(trip);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const deleteJournal = async (req: Request, res: Response): Promise<void> => {
	try {
		const { uid, id } = req.params;
		await prisma.user.update({
			where: {
				uid
			},
			data: {
				journals: {
					deleteMany: {
						id: Number(id),
					},
				},
			},
		});
		res.sendStatus(204);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const addNewNote = async (req: Request, res: Response): Promise<void> => {
	try {
		const trip = await prisma.note.create({ data: req.body });
		res.status(201);
		res.send(trip);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const getPersonalNotes = async (req: Request, res: Response): Promise<void> => {
	try {
		const uid = req.params.uid;
		const user = await prisma.user.findUnique({
			where: {
				uid
			},
			select: {
				notes: true
			}
		});
		console.log(user);
		res.status(200);
		const result = user ? user.notes : [];
		res.send(result);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const deleteNote = async (req: Request, res: Response): Promise<void> => {
	try {
		const { uid, id } = req.params;
		await prisma.note.deleteMany({
			where: {
				uid,
				id: Number(id)
			}
		});
		res.sendStatus(204);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const getPublicJournals = async (
	req: Request,
	res: Response
): Promise<void> => {
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
};

const controller = {
	checkUser,
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
};

export default controller;
