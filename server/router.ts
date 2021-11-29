import express from 'express';

const router = express.Router();
const trip = require('./controllers/controller');

router.post('/signup', trip.doSignUp);
router.get('/login', trip.getLogin);
router.get('/profile', trip.getProfile);
router.post('/trips', trip.addNewTrip);
router.get('/trips', trip.getAllPersonalTrips);
// router.put('/trips/:id', trip.updatePersonalTrip);
// router.delete('/trips/:id', trip.deletePersonalTrip);
router.post('/journals', trip.addNewJournal);
router.get('/journals', trip.getAllPersonalJournals);
// router.put('/journals/:id', trip.updatePersonalJournal);
// router.delete('/journals/:id', trip.deletePersonalJournal);
router.post('/notes', trip.addNewNote);
router.get('/notes', trip.getAllPersonalNotes);
router.get('/journals/collections', trip.getAllPublicJournals);

export default router;
