import { Router } from "express";
const router = Router();
const imagesController = require("../controller/ImagesController");

router.get("/images/:fileName", imagesController.getImage);

module.exports = router;
