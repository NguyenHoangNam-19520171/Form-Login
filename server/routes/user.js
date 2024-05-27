const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = require('express').Router();

router.get("/",auth.verifyToken, userController.getAllUsers)


module.exports = router