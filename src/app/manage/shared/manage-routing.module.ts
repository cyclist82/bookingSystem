import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManageBookingComponent} from '../manage-booking/manage-booking.component';
import {ManageRentalComponent} from '../manage-rental/manage-rental.component';
import {AuthGuard} from '../../auth/shared/auth.guard';
import {ManageComponent} from '../manage.component';

const manageRoutes: Routes = [
    {
        path: 'manage', component: ManageComponent, children: [
            {path: 'bookings', component: ManageBookingComponent, canActivate: [AuthGuard]},
            {path: 'rentals', component: ManageRentalComponent, canActivate: [AuthGuard]},
        ]
    }];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(manageRoutes)],
    exports: [RouterModule
    ]
})
export class ManageRoutingModule {
}
