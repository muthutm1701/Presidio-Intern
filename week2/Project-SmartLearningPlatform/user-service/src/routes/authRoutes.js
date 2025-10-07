const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, logoutUser, refreshToken
    } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');



router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users/:id', protect, getUserProfile);
router.post('/refresh', refreshToken);
router.post('/logout', logoutUser);


module.exports = router;