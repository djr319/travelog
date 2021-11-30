import express from 'express';

const router = express.Router();
const trip = require('./controllers/controller');

router.post('/signup', trip.signUp);
router.get('/login', trip.getLogin);
router.get('/profile/:id', trip.getProfile);
router.post('/trips', trip.addNewTrip);
router.get('/trips/:id', trip.getPersonalTrips);
router.put('/trips/:id', trip.updateTrip);
router.delete('/trips/:id', trip.deleteTrip);
router.post('/journals', trip.addNewJournal);
router.get('/journals/:id', trip.getPersonalJournals);
router.put('/journals/:id', trip.updateJournal);
router.delete('/journals/:id', trip.deleteJournal);
router.post('/notes', trip.addNewNote);
router.get('/notes/:id', trip.getPersonalNotes);
router.delete('/notes/:id', trip.deleteNote);
router.get('/collections', trip.getPublicJournals);

export default router;
