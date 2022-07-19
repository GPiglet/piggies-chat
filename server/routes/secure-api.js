const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/profile', UserController.profile);

module.exports = router;