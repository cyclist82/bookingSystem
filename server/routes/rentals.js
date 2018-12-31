const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const User = require('../models/user');

const UserCtrl = require('../controllers/user');
const {normalizeErrors} = require('../helpers/mongoose');

router.get('/secret', UserCtrl.authMiddleWare, function (req, res) {
    res.json({'secret': true})
});

router.get('/manage', UserCtrl.authMiddleWare, function (req, res) {
    const user = res.locals.user;
    Rental.where({user})
        .populate('bookings')
        .exec(function (err, foundRentals) {
            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
            return res.json(foundRentals);
        });
});

router.get('/:id', function (req, res) {
    const rentalId = req.params.id;
    Rental.findById(rentalId)
        .populate('user', 'username -_id')
        .populate('bookings', 'startAt endAt -_id')
        .exec(function (err, foundRental) {
            if (err) {
                return res.status(422).send({
                    errors: [{
                        title: 'Fehler!',
                        detail: 'Wohnung konnte nicht gefunden werden!'
                    }]
                })
            }
            return res.json(foundRental);
        });
});

router.delete('/:id', UserCtrl.authMiddleWare, function (req, res) {
    const user = res.locals.user;
    Rental.findById(req.params.id)
        .populate('user', '_id')
        .populate({
            path: 'bookings',
            select: 'startAt',
            match: {startAt: {$gt: new Date()}}
        })
        .exec(function (err, foundRental) {
            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
            if (user.id !== foundRental.user.id) {
                return res.status(422).send({
                    errors: [{
                        title: 'Fehler!',
                        detail: 'Wohnung ist nicht ihre eigene, keine Berechtigung!'
                    }]
                });
            }
            if (foundRental.bookings.length > 0) {
                return res.status(422).send({
                    errors: [{
                        title: 'Active Buchungen!',
                        detail: 'Löschen einer Wohnung mit aktiven Buchungen nicht möglich!'
                    }]
                });
            }
            foundRental.remove(function (err) {
                if (err) {
                    return res.status(422).send({errors: normalizeErrors(err.errors)});
                }
                return res.json({'status': 'deleted'});
            })
        })
})

router.post('', UserCtrl.authMiddleWare, function (req, res) {
    const {title, city, street, category, image, bedrooms, shared, description, dailyRate} = req.body;
    const user = res.locals.user;

    const rental = new Rental({title, city, street, category, image, bedrooms, shared, description, dailyRate})
    rental.user = user;

    Rental.create(rental, function (err, newRental) {
        if (err) {
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }
        User.updateOne({_id: user.id}, {$push: {rentals: newRental}}, function () {
        });
        return res.json(newRental)
    })
});

router.get('', function (req, res) {
    const city = req.query.city;
    const query = city ? {city: city.toLowerCase()} : {};

    Rental.find(query)
        .select('-bookings')
        .exec(function (err, foundrentals) {
            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }
            if (city && foundrentals.length === 0) {
                return res.status(422).send({
                    errors: [{
                        title: 'Keine Wohnungen gefunden!',
                        detail: 'Es wurde in ' + city + ' keine Wohnung gefunden!'
                    }]
                })
            }
            return res.json(foundrentals);
        });
});


module.exports = router;
