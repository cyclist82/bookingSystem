import {Component, OnInit} from '@angular/core';
import {BookingService} from '../../booking/shared/booking.service';
import {Booking} from '../../booking/shared/booking.model';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-manage-booking',
    templateUrl: './manage-booking.component.html',
    styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

    bookings: Booking[];
    errors: any[] = [];

    constructor(private bookingService: BookingService) {
    }

    ngOnInit() {
        this.bookingService.getBookingsByUser()
            .subscribe((bookings: Booking[]) => {
                this.bookings = bookings;
            }, (errorResponse: HttpErrorResponse) => {
                this.errors = errorResponse.error.errors;
            });
    }

}
