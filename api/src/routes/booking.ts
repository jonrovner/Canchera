import { Router } from "express";
const router = Router();
const BookingController = require('../controller/BookingController')

router.post('/booking', BookingController.postBooking);

router.get('/booking/:clubName', BookingController.getBookings);

router.delete('/booking/:userId', BookingController.deleteBooking );

router.post('/booking/sendEmial/:id', BookingController.bookingInvitation);

module.exports = router;
