import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import {RentalModule} from './rental/rental.module';
import {RentalRoutingModule} from './rental/shared/rental-routing.module';

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
export class AppModule { }
