export {};
const { Router } = require("express");
// const axios = require("axios");
 const router = Router();
// const { User } = require("../db.ts");
 const FieldController = require("../controller/FieldController.ts");
// const verifyUser = require('../middlewares/verifyRecord')



router.get('/field', FieldController.getFields)
router.post('/field', FieldController.postField)




module.exports = router;