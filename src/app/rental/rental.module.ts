import {NgModule} from '@angular/core';
import {RentalListComponent} from './rental-list/rental-list.component';
import {RentalListItemComponent} from './rental-list-item/rental-list-item.component';
import {RentalComponent} from './rental.component';
import {CommonModule} from '@angular/common';
import {RentalService} from './shared/rental.service';
import {RentalRoutingModule} from './shared/rental-routing.module';
import {RentalDetailComponent} from './rental-detail/rental-detail.component';
import {HttpClientModule} from '@angular/common/http';
import {NgPipesModule} from 'ngx-pipes';
import {UppercPipe} from '../common/pipes/upperc.pipe';
import {MapModule} from '../common/map/map.module';
import {Daterangepicker} from 'ng2-daterangepicker';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';

@NgModule({
    declarations: [
        RentalListComponent,
        RentalListItemComponent,
        RentalComponent,
        RentalDetailComponent,
        UppercPipe,
        RentalDetailBookingComponent],
    imports: [
        CommonModule,
        RentalRoutingModule,
        HttpClientModule,
        NgPipesModule,
        MapModule,
        Daterangepicker
    ],
    providers: [
        RentalService
    ]
})
export class RentalModule {


}
