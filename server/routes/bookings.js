const express = require('express');
const router = express.Router();

const UserCtrl = require('../controllers/user');
const BookingCtrl = require('../controllers/booking');

router.get('/manage', UserCtrl.authMiddleWare, BookingCtrl.getUserBookings);

router.post('', UserCtrl.authMiddleWare, BookingCtrl.createBooking);

module.exports = router;
