import {NgModule} from '@angular/core';
import {AgmCoreModule} from '@agm/core';
import {CommonModule} from '@angular/common';

import {MapComponent} from './map.component';
import {CamelizePipe} from 'ngx-pipes';
import {MapService} from './map.service';
import {GoogleMapsAPI} from './config/dev';


@NgModule({
    declarations: [
        MapComponent],
    imports: [
        CommonModule,
        AgmCoreModule.forRoot({
            apiKey: new GoogleMapsAPI().getAPIKey()
        }),
    ],
    exports: [
        MapComponent],
    providers: [MapService, CamelizePipe],
})
export class MapModule {
}
