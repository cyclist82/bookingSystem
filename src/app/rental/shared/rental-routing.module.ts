import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RentalComponent} from '../rental.component';
import {RentalListComponent} from '../rental-list/rental-list.component';
import {RentalDetailComponent} from '../rental-detail/rental-detail.component';
import {CommonModule} from '@angular/common';
import {AuthGuard} from '../../auth/shared/auth.guard';
import {RentalSearchComponent} from '../rental-search/rental-search.component';
import {RentalCreateComponent} from '../rental-create/rental-create.component';

const rentalRoutes: Routes = [
    {
        path: 'rentals', component: RentalComponent,
        children: [
            {path: '', component: RentalListComponent},
            {path: 'new', component: RentalCreateComponent, canActivate: [AuthGuard]},
            {path: ':rentalId', component: RentalDetailComponent},
            {path: ':city/homes', component: RentalSearchComponent},
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
