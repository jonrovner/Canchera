import { Router, Request, Response } from "express";

const SignUp = require("./signup");
const User = require("./user");
const Field = require("./field");
const Club = require("./club");
const Booking = require("./booking");
const Checkout = require("./checkout");
const Images = require("./images");

const router = Router();

// Configurar los routers

router.use("/", SignUp);
router.use("/", User);
router.use("/", Field);
router.use("/", Club);
router.use("/", Booking);
router.use("/", Checkout);
router.use("/", Images);

module.exports = router;
