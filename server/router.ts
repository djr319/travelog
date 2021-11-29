import express from 'express';

const router = express.Router();
const trip = require('./controllers/controller');

router.post('/signup', trip.doSignUp);
router.get('/login', trip.getLogin);
router.get('/profile', trip.getProfile);
router.post('/trips', trip.addNewTrip);
router.get('/trips', trip.getAllPersonalTrips);
router.get('/trips/:id', trip.getOnePersonalTrip);
// router.put('/trips/:id', trip.updateOnePersonalTrip);
// router.delete('/trips/:id', trip.deleteOnePersonalTrip);
router.post('/journals', trip.addNewJournal);
router.get('/journals', trip.getAllPersonalJournals);
router.get('/journals/:id', trip.getOnePersonalJournal);
// router.put('/journals/:id', trip.updateOnePersonalJournal);
// router.delete('/journals/:id', trip.deleteOnePersonalJournal);
router.post('/notes', trip.addNewNote);
router.get('/notes', trip.getAllPersonalNotes);
// router.delete('/notes/:id', trip.deleteOnePersonalNote);
router.get('/journals/collections', trip.getAllPublicJournals);

export default router;
