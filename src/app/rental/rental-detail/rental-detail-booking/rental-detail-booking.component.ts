import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Booking} from '../../../booking/shared/booking.model';
import {HelperService} from '../../../common/service/helper.service';
import * as moment from 'moment';
import {Rental} from '../../shared/rental.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BookingService} from '../../../booking/shared/booking.service';
import {DaterangePickerComponent} from 'ng2-daterangepicker';
import {ToastaConfig, ToastaService} from 'ngx-toasta';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'bsw-rental-detail-booking',
    templateUrl: './rental-detail-booking.component.html',
    styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

    @Input() rental: Rental;
    @ViewChild(DaterangePickerComponent)
    private picker: DaterangePickerComponent;

    newBooking: Booking;
    modalRef: any;

    daterange: any = {};
    bookedOutDates: any[] = [];
    errors: any[] = [];

    options: any = {
        locale: {format: Booking.DATE_FORMAT},
        alwaysShowCalendars: false,
        opens: 'left',
        autoUpdateInput: false,
        isInvalidDate: this.checkForInvalidDates.bind(this),
    };

    constructor(private helper: HelperService,
                private modalService: NgbModal,
                private bookingService: BookingService,
                private toastaService: ToastaService,
                private toastaConfig: ToastaConfig) {
        this.toastaConfig.theme = 'bootstrap';
        this.toastaConfig.position = 'top-right';
    }

    ngOnInit() {
        this.newBooking = new Booking();
        this.getBookedOutDates();
    }

    private checkForInvalidDates(date) {
        return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) || date.diff(moment(), 'days') < 0;
    }

    private getBookedOutDates() {
        const bookings = this.rental.bookings;
        if (bookings && bookings.length > 0) {
            bookings.forEach((booking: Booking) => {
                const dateRange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
                this.bookedOutDates.push(...dateRange);
            });
        }
    }

    private addNewBookedOutDates(bookingData: any) {
        const dateRange = this.helper.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt);
        this.bookedOutDates.push(...dateRange);
    }

    private resetDatePicker() {
        this.picker.datePicker.setStartDate(moment());
        this.picker.datePicker.setEndDate(moment());
        this.picker.datePicker.element.val('');
    }

    obenConfirmModal(content) {
        this.errors = [];
        this.modalRef = this.modalService.open(content);
    }

    createBooking() {
        this.newBooking.rental = this.rental;
        this.bookingService.createBooking(this.newBooking)
            .subscribe(
                (bookingData: any) => {
                    this.addNewBookedOutDates(bookingData);
                    this.newBooking = new Booking();
                    this.modalRef.close();
                    this.resetDatePicker();
                    this.toastaService.success({
                        title: 'Buchung erfolgreich!',
                        msg: 'Sie können Ihre Buchung später verwalten',
                        showClose: false,
                        timeout: 5000,
                    });
                },
                (errorResponse: any) => {
                    this.errors = errorResponse.error.errors;
                });
    }

    public selectedDate(value: any, datepicker?: any) {
        this.options.autoUpdateInput = true;
        this.newBooking.startAt = moment(value.start).format('YYYY/MM/DD');
        this.newBooking.endAt = moment(value.end).format('YYYY/MM/DD');
        this.newBooking.days = value.end.diff(value.start, 'days');
        this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;
    }
}
