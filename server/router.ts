import express from "express";

const router = express.Router();
import controller from "./controllers/controller";

router.post("/user", controller.checkUser);
router.post("/profile", controller.addProfile);
router.get("/profile/:uid", controller.getProfile);
router.post("/trips", controller.addNewTrip);
router.get("/trips/:id", controller.getPersonalTrips);
router.put("/trips/:id", controller.updateTrip);
router.delete("/trips/:id", controller.deleteTrip);
router.post("/journals/submit", controller.submitJournal);
router.post("/journals/match/:uid", controller.getMatchingJournals);
router.get("/journals/:uid", controller.getPersonalJournals);
router.delete("/journals/:id", controller.deleteJournal);
router.post("/notes/:uid", controller.addNewNote);
router.get("/notes/:uid", controller.getPersonalNotes);
router.delete("/notes/:uid/:id", controller.deleteNote);
router.get("/collections", controller.getPublicJournals);

export default router;
