import express from 'express';

const router = express.Router();
const trip = require('./controllers/controller');

router.post('/signup', trip.signUp);
router.get('/login', trip.getLogin);
router.get('/profile', trip.getProfile);

router.post('/trips', trip.addTrip);
router.get('/trips', trip.getOwnTrips);
router.get('/trips/:id', trip.getTrip);
// router.put('/trips/:id', trip.updateTrip);
// router.delete('/trips/:id', trip.deleteTrip);

router.post('/journals', trip.addJournal);
router.get('/journals', trip.getOwnJournals);
router.get('/journals/:id', trip.getJournal);
router.get('/journals/collections', trip.getPublicJournals);
router.put('/journals/:id', trip.updateJournal);
router.delete('/journals/:id', trip.deleteJournal);

router.post('/notes', trip.addNewNote);
router.get('/notes', trip.getOwnNotes);
// router.delete('/notes/:id', trip.deleteNote);


export default router;
