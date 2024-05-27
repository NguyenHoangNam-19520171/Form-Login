const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const router = require('express').Router();

router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)
router.post("/refresh", authController.requestRefreshToken)
router.post("/logout",auth.verifyToken, authController.userLogout)

module.exports = router