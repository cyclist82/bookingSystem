import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './common/header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {RentalModule} from './rental/rental.module';
import {UppercasePipe} from './common/pipes/upperc.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RentalModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
