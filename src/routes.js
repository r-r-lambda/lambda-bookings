const express = require('express');

const createBooking = require('./services/create-booking');
const getUserBookings = require('./services/get-user-bookings');

const router = express.Router();

router.post('/booking', createBooking);
router.get('/booking/:id', getUserBookings);

module.exports = router;
