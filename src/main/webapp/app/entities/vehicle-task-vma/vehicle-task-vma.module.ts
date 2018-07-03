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
import {
    VehicleTaskDriverVmaDialogComponent,
    VehicleTaskDriverVmaPopupComponent
} from "./vehicle-task-driver-vma-dialog.component";

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
        VehicleTaskDriverVmaDialogComponent,
        VehicleTaskVmaDeleteDialogComponent,
        VehicleTaskVmaPopupComponent,
        VehicleTaskDriverVmaPopupComponent,
        VehicleTaskVmaDeletePopupComponent,
    ],
    entryComponents: [
        VehicleTaskVmaComponent,
        VehicleTaskVmaDialogComponent,
        VehicleTaskDriverVmaDialogComponent,
        VehicleTaskVmaPopupComponent,
        VehicleTaskVmaDeleteDialogComponent,
        VehicleTaskVmaDeletePopupComponent,
        VehicleTaskDriverVmaPopupComponent
    ],
    providers: [
        VehicleTaskVmaService,
        VehicleTaskVmaPopupService,
        VehicleTaskVmaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleManagerApplicationVehicleTaskVmaModule {}
