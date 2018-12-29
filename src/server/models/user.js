const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        min: [4, 'Zu kurz, bitte mindestens 4 Zeichen'],
        max: [32, 'Zu lang, bitte maximal 32 Zeichen']
    },
    email: {
        type: String,
        min: [4, 'Zu kurz, bitte mindestens 4 Zeichen'],
        max: [32, 'Zu lang, bitte maximal 32 Zeichen'],
        unique: true,
        lowercase: true,
        required: 'EMail wird benötigt',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    password: {
        type: String,
        min: [8, 'Zu kurz, bitte mindestens 8 Zeichen'],
        max: [32, 'Zu lang, bitte maximal 32 Zeichen'],
        required: 'Passwort wird benötigt'
    },
    rentals: [{type: Schema.Types.ObjectId, ref: 'Rental'}],
    bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}],
});

userSchema.methods.hasSamePassword = function (requestedPassword) {
    return bcrypt.compareSync(requestedPassword, this.password);
}

userSchema.pre('save', function (next) {
    const user = this;
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema);
