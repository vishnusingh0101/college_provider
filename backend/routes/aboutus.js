const express = require('express');
const router = express.Router();

const joinUsController = require('../controller/joinUsController');

// Route for form submission
router.post('/join-us', joinUsController.submitJoinUsForm);

module.exports = router;
