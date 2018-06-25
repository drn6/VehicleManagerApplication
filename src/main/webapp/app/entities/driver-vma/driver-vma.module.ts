import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VehicleManagerApplicationSharedModule } from '../../shared';
import {
    DriverVmaService,
    DriverVmaPopupService,
    DriverVmaComponent,
    DriverVmaDetailComponent,
    DriverVmaDialogComponent,
    DriverVmaPopupComponent,
    DriverVmaDeletePopupComponent,
    DriverVmaDeleteDialogComponent,
    driverRoute,
    driverPopupRoute,
    DriverVmaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...driverRoute,
    ...driverPopupRoute,
];

@NgModule({
    imports: [
        VehicleManagerApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DriverVmaComponent,
        DriverVmaDetailComponent,
        DriverVmaDialogComponent,
        DriverVmaDeleteDialogComponent,
        DriverVmaPopupComponent,
        DriverVmaDeletePopupComponent,
    ],
    entryComponents: [
        DriverVmaComponent,
        DriverVmaDialogComponent,
        DriverVmaPopupComponent,
        DriverVmaDeleteDialogComponent,
        DriverVmaDeletePopupComponent,
    ],
    providers: [
        DriverVmaService,
        DriverVmaPopupService,
        DriverVmaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleManagerApplicationDriverVmaModule {}
