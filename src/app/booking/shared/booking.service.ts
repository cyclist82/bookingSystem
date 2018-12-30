import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Booking} from './booking.model';
import {Observable} from 'rxjs';

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
}
