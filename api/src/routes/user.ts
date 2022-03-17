import Router from "express";
const router = Router();
const UserController = require("../controller/UserController.ts");

router.get("/user", UserController.getUser);

module.exports = router;
