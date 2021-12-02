import express from 'express';

const router = express.Router();
import controller from './controllers/controller';

router.post('/signup', controller.createUser);
router.get('/login', controller.getLogin);
router.get('/profile/:id', controller.getProfile);
router.post('/trips', controller.addNewTrip);
router.get('/trips/:id', controller.getPersonalTrips);
router.put('/trips/:id', controller.updateTrip);
router.delete('/trips/:id', controller.deleteTrip);
router.post('/journals', controller.addNewJournal);
router.get('/journals/:id', controller.getPersonalJournals);
router.put('/journals/:id', controller.updateJournal);
router.delete('/journals/:uid/:id', controller.deleteJournal);
router.post('/notes', controller.addNewNote);
router.get('/notes/:id', controller.getPersonalNotes);
router.delete('/notes/:id', controller.deleteNote);
router.get('/collections', controller.getPublicJournals);

export default router;
