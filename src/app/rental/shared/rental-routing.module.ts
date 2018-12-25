import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RentalComponent} from '../rental.component';
import {RentalListComponent} from '../rental-list/rental-list.component';
import {RentalDetailComponent} from '../rental-detail/rental-detail.component';
import {CommonModule} from '@angular/common';

const rentalRoutes: Routes = [
  {
    path: 'rentals', component: RentalComponent,
    children: [
      {path: '', component: RentalListComponent},
      {path: ':rentalId', component: RentalDetailComponent},
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(rentalRoutes)],
  exports: [RouterModule
  ]
})
export class RentalRoutingModule {
}
