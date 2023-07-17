const express = require('express');
const router = express.Router();

const { login, refresh, logout } = require('../controllers/authController');

// Login route
router.post('/login', login);

// Refresh route
router.post('/refresh', refresh);

// Logout route
router.post('/logout', logout);

module.exports = router;
