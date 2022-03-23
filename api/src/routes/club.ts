import { Router } from "express";
const router = Router();
const ClubController = require("../controller/ClubController");

router.post("/club", ClubController.postClub);
router.get("/club", ClubController.getClubs);
router.get("/club/:clubName", ClubController.clubDetail);

module.exports = router;
