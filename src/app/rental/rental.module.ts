import {NgModule} from '@angular/core';
import {RentalListComponent} from './rental-list/rental-list.component';
import {RentalListItemComponent} from './rental-list-item/rental-list-item.component';
import {RentalComponent} from './rental.component';
import {CommonModule} from '@angular/common';
import {RentalService} from './shared/rental.service';
import {RentalRoutingModule} from './shared/rental-routing.module';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';

@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalComponent,
    RentalDetailComponent],
  imports: [
    CommonModule,
    RentalRoutingModule
  ],
  providers: [
    RentalService
  ]
})
export class RentalModule {


}
