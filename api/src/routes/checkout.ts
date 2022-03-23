import { Router } from "express";
const router = Router();
const checkoutController = require('../controller/CheckoutController')

router.post('/checkout', checkoutController.postCheckout);
router.get('/feedback', checkoutController.getFeedback);


module.exports = router;