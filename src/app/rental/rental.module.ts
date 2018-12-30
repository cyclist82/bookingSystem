import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RentalRoutingModule} from './shared/rental-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {NgPipesModule} from 'ngx-pipes';

import {RentalListComponent} from './rental-list/rental-list.component';
import {RentalListItemComponent} from './rental-list-item/rental-list-item.component';
import {RentalDetailComponent} from './rental-detail/rental-detail.component';
import {RentalComponent} from './rental.component';

import {RentalService} from './shared/rental.service';
import {HelperService} from '../common/service/helper.service';
import {UppercPipe} from '../common/pipes/upperc.pipe';
import {MapModule} from '../common/map/map.module';
import {Daterangepicker} from 'ng2-daterangepicker';
import {RentalDetailBookingComponent} from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import {FormsModule} from '@angular/forms';
import {BookingService} from '../booking/shared/booking.service';
import {ToastaModule} from 'ngx-toasta';
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';

@NgModule({
    declarations: [
        RentalListComponent,
        RentalListItemComponent,
        RentalComponent,
        RentalDetailComponent,
        UppercPipe,
        RentalDetailBookingComponent,
        RentalSearchComponent,
        RentalCreateComponent],
    imports: [
        CommonModule,
        RentalRoutingModule,
        HttpClientModule,
        NgPipesModule,
        MapModule,
        Daterangepicker,
        FormsModule,
        ToastaModule,
    ],
    providers: [
        RentalService,
        HelperService,
        BookingService,
    ]
})
export class RentalModule {


}
