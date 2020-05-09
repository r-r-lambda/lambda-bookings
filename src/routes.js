const express = require('express');

const createBooking = require('./services/create-booking');

const router = express.Router();

router.post('/booking', createBooking);

module.exports = router;
