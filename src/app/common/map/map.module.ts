import {NgModule} from '@angular/core';
import {AgmCoreModule} from '@agm/core';
import {CommonModule} from '@angular/common';

import {MapComponent} from './map.component';
import {CamelizePipe} from 'ngx-pipes';
import {MapService} from './map.service';
import {GOOGLE_API_KEY} from '../../../../server/config';


@NgModule({
    declarations: [
        MapComponent],
    imports: [
        CommonModule,
        AgmCoreModule.forRoot({
            apiKey: GOOGLE_API_KEY
        }),
    ],
    exports: [
        MapComponent],
    providers: [MapService, CamelizePipe],
})
export class MapModule {
}
