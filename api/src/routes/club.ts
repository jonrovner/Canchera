import { Router } from "express";
const router = Router();
const ClubController = require("../controller/ClubController");

router.post("/club", ClubController.uploadImage, ClubController.postClub);
router.get("/club", ClubController.getClubs);
router.get("/club/:clubName", ClubController.clubDetail);
router.put("/club/:clubName", ClubController.updateClub);

module.exports = router;
