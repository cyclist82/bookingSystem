const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    startAt: {type: Date, required: 'Startdatum wird benötigt'},
    endAt: {type: Date, required: 'Enddatum wird benötigt'},
    totalPrice: Number,
    guests: Number,
    createdAt: {type: Date, default: Date.now},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    rental: {type: Schema.Types.ObjectId, ref: 'Rental'},
});

module.exports = mongoose.model('Booking', bookingSchema);
