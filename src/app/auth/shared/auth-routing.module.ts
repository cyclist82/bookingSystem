import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from '../register/register.component';
import {LoginComponent} from '../login/login.component';
import {AuthGuard} from './auth.guard';

const authRoutes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]}
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(authRoutes)],
    exports: [RouterModule
    ]
})
export class AuthRoutingModule {
}
