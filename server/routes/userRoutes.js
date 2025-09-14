const router = require('express').Router();
const UserController = require('../controller/userController')

router.post('/register', UserController.addUser);
router.post('/login', UserController.loginUser);
module.exports = router;