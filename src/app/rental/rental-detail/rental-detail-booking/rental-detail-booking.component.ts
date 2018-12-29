import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'bsw-rental-detail-booking',
    templateUrl: './rental-detail-booking.component.html',
    styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

    @Input() price: number;

    daterange: any = {};

    options: any = {
        locale: {format: 'DD.MM.YYYY'},
        alwaysShowCalendars: false,
        opens: 'left',
    };

    constructor() {
    }

    ngOnInit() {
    }


    public selectedDate(value: any, datepicker?: any) {
        // any object can be passed to the selected event and it will be passed back here
        datepicker.start = value.start;
        datepicker.end = value.end;

        // or manupulat your own internal property
        this.daterange.start = value.start;
        this.daterange.end = value.end;
        this.daterange.label = value.label;
    }
}
