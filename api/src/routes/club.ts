import { Router } from "express";
const router = Router();
const ClubController = require('../controller/ClubController')

router.post('/createdclub', ClubController.postClub);
router.get('/clubs', ClubController.getClubs);
router.get('/:clubId')


module.exports = router;