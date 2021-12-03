import express from 'express';

const router = express.Router();
import controller from './controllers/controller';

router.post('/user', controller.checkUser);
router.get('/profile/:id', controller.getProfile);
router.post('/trips', controller.addNewTrip);
router.get('/trips/:id', controller.getPersonalTrips);
router.put('/trips/:id', controller.updateTrip);
router.delete('/trips/:id', controller.deleteTrip);
router.post('/journals/:uid', controller.addNewJournal);
router.get('/journals/:uid', controller.getPersonalJournals);
router.put('/journals/:uid/:id', controller.updateJournal);
router.delete('/journals/:uid/:id', controller.deleteJournal);
router.post('/notes/:uid', controller.addNewNote);
router.get('/notes/:uid', controller.getPersonalNotes);
router.delete('/notes/:id', controller.deleteNote);
router.get('/collections', controller.getPublicJournals);

export default router;
