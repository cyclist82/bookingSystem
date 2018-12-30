const Rental = require('./models/rental');
const User = require('./models/user');
const Booking = require('./models/booking');
const fakeDBDate = require('./data.json');

class FakeDB {
    constructor() {
        this.rentals = fakeDBDate.rentals;
        this.users = fakeDBDate.users;
    }

    async cleanDb() {
        await User.deleteMany({});
        await Rental.deleteMany({});
        await Booking.deleteMany({});
    }

    pushDataToDb() {
        const user = new User(this.users[0]);
        const user2 = new User(this.users[1]);
        this.rentals.forEach((rental) => {
            const newRental = new Rental(rental);
            newRental.user = user;
            user.rentals.push(newRental);
            newRental.save();
        });
        user.save();
        user2.save();
    }

    async seedDb() {
        await this.cleanDb();
        this.pushDataToDb();
    }

}

module.exports = FakeDB;
