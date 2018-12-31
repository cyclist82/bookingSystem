import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Booking} from './booking.model';
import {Observable} from 'rxjs';
import {Rental} from '../../rental/shared/rental.model';

const BOOKING_BASE_URI = 'api/v1/bookings';

@Injectable({
    providedIn: 'root'
})
export class BookingService {

    constructor(private http: HttpClient) {
    }

    public createBooking(booking: Booking): Observable<any> {
        return this.http.post(BOOKING_BASE_URI, booking);
    }

    public getBookingsByUser(): Observable<Booking[]> {
        return this.http.get<Booking[]>(BOOKING_BASE_URI + '/manage');
    }
}
