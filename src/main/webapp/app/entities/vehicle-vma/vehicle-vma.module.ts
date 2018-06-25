import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VehicleManagerApplicationSharedModule } from '../../shared';
import {
    VehicleVmaService,
    VehicleVmaPopupService,
    VehicleVmaComponent,
    VehicleVmaDetailComponent,
    VehicleVmaDialogComponent,
    VehicleVmaPopupComponent,
    VehicleVmaDeletePopupComponent,
    VehicleVmaDeleteDialogComponent,
    vehicleRoute,
    vehiclePopupRoute,
    VehicleVmaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...vehicleRoute,
    ...vehiclePopupRoute,
];

@NgModule({
    imports: [
        VehicleManagerApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VehicleVmaComponent,
        VehicleVmaDetailComponent,
        VehicleVmaDialogComponent,
        VehicleVmaDeleteDialogComponent,
        VehicleVmaPopupComponent,
        VehicleVmaDeletePopupComponent,
    ],
    entryComponents: [
        VehicleVmaComponent,
        VehicleVmaDialogComponent,
        VehicleVmaPopupComponent,
        VehicleVmaDeleteDialogComponent,
        VehicleVmaDeletePopupComponent,
    ],
    providers: [
        VehicleVmaService,
        VehicleVmaPopupService,
        VehicleVmaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleManagerApplicationVehicleVmaModule {}
