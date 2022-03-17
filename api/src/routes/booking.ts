import { Router } from "express";
const router = Router();
const BookingController = require('../controller/BookingController')

router.post('/booking', BookingController.postBooking);
// router.get('/clubs', ClubController.getClubs);
// router.get('/:clubId')


module.exports = router;