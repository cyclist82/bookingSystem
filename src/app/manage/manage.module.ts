import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManageRoutingModule} from './shared/manage-routing.module';
import {ManageRentalComponent} from './manage-rental/manage-rental.component';
import {ManageBookingComponent} from './manage-booking/manage-booking.component';
import {ManageComponent} from './manage.component';

import {BookingService} from '../booking/shared/booking.service';
import {RentalService} from '../rental/shared/rental.service';

import {AuthGuard} from '../auth/shared/auth.guard';
import {FormatDatePipe} from '../common/pipes/format-date.pipe';
import {ManageRentalBookingComponent} from './manage-rental/manage-rental-booking/manage-rental-booking.component';
import {ToastaModule} from 'ngx-toasta';

@NgModule({
    declarations: [
        ManageComponent,
        ManageRentalComponent,
        ManageBookingComponent,
        FormatDatePipe,
        ManageRentalBookingComponent,
    ],
    imports: [
        CommonModule,
        ManageRoutingModule,
        ToastaModule,
    ],
    providers: [
        AuthGuard,
        BookingService,
        RentalService,
    ]
})
export class ManageModule {
}
