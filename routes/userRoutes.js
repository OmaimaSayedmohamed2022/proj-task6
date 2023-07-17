const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/userController');

// Retrieve all users
router.get('/', UserController.getAllUsers);

// Retrieve a specific user by their ID
router.get('/:id', UserController.getUserById);

// Create a new user
router.post('/', UserController.createUser);

// Update an existing user by their ID
router.put('/:id', UserController.updateUser);

// Delete a specific user by their ID
router.delete('/:id', UserController.deleteUser);

module.exports = router;
