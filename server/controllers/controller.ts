import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const checkUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { uid, userName: username, photoURL, email } = req.body;
		const data = {
			uid,
			username,
			photoURL,
			email
		};
		let user = await prisma.user.upsert({
			where: {
				uid
			},
			update: data,
			create: data
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
const addProfile = async (req: Request, res: Response): Promise<void> => {
	try {
		const { uid } = req.body;
		const trip = await prisma.user.update({
			data: req.body,
			where: {
				uid: uid
			}
		});
		res.status(201);
		res.send(trip);
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
		const { id: uid } = req.params;

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
		const { review, photoURL, tags } = req.body;
		const trip = await prisma.user.update({
			where: {
				uid
			},
			data: {
				journals: {
					create: {
						review,
						photoURL,
						tags
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
				journals: true,
			}
		});
		res.status(200);
		res.send(user && user.journals);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const getMatchingJournals = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { uid } = req.params;
		const { tags } = req.body;
		const journals = await prisma.journal.findMany({
			where: {
				NOT: {
					uid
				},
				AND: {
					tags: {
						hasSome: tags
					}
				}
			}
		});
		res.status(200);
		res.send(journals);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const updateJournal = async (req: Request, res: Response): Promise<void> => {
	try {
		const { uid, id } = req.params;
		const { review, photoURL, tags } = req.body;
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
							review,
							photoURL, 
							tags
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
						id: Number(id)
					}
				}
			}
		});
		res.sendStatus(204);
	} catch (err) {
		console.error('error', err);
		res.sendStatus(500);
	}
};

const addNewNote = async (req: Request, res: Response): Promise<void> => {
	try {
		const { uid } = req.params;
		const { note } = req.body;
		const trip = await prisma.user.update({
			where: {
				uid
			},
			data: {
				notes: {
					create: {
						note
					}
				}
			},
			select: {
				notes: true
			}
		});
		res.status(201);
		res.send(trip.notes);
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
		await prisma.user.update({
			where: {
				uid
			},
			data: {
				notes: {
					deleteMany: {
						id: Number(id)
					}
				}
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
	addProfile,
	getProfile,
	addNewTrip,
	getPersonalTrips,
	updateTrip,
	deleteTrip,
	addNewJournal,
	getPersonalJournals,
	getMatchingJournals,
	updateJournal,
	deleteJournal,
	addNewNote,
	getPersonalNotes,
	deleteNote,
	getPublicJournals
};

export default controller;
