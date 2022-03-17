import { Router } from "express";
const router = Router();
const BookingController = require('../controller/BookingController')

router.post('/booking', BookingController.postBooking);
router.get('/booking/:clubId', BookingController.getBookings);



module.exports = router;