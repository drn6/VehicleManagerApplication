import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VehicleManagerApplicationSharedModule } from '../../shared';
import {
    VehicleTaskVmaService,
    VehicleTaskVmaPopupService,
    VehicleTaskVmaComponent,
    VehicleTaskVmaDetailComponent,
    VehicleTaskVmaDialogComponent,
    VehicleTaskVmaPopupComponent,
    VehicleTaskVmaDeletePopupComponent,
    VehicleTaskVmaDeleteDialogComponent,
    vehicleTaskRoute,
    vehicleTaskPopupRoute,
    VehicleTaskVmaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...vehicleTaskRoute,
    ...vehicleTaskPopupRoute,
];

@NgModule({
    imports: [
        VehicleManagerApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VehicleTaskVmaComponent,
        VehicleTaskVmaDetailComponent,
        VehicleTaskVmaDialogComponent,
        VehicleTaskVmaDeleteDialogComponent,
        VehicleTaskVmaPopupComponent,
        VehicleTaskVmaDeletePopupComponent,
    ],
    entryComponents: [
        VehicleTaskVmaComponent,
        VehicleTaskVmaDialogComponent,
        VehicleTaskVmaPopupComponent,
        VehicleTaskVmaDeleteDialogComponent,
        VehicleTaskVmaDeletePopupComponent,
    ],
    providers: [
        VehicleTaskVmaService,
        VehicleTaskVmaPopupService,
        VehicleTaskVmaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleManagerApplicationVehicleTaskVmaModule {}
