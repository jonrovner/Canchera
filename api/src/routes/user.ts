import Router from 'express'
const router = Router();
const UserController = require('../controller/UserController.ts')
const verifyRecord = require('../middlewares/verifyRecord')

router.get('/user', verifyRecord.verifyUser , UserController.getUser);


module.exports = router;