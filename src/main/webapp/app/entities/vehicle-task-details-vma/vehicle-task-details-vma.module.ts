import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VehicleManagerApplicationSharedModule } from '../../shared';
import {
    VehicleTaskDetailsVmaService,
    VehicleTaskDetailsVmaPopupService,
    VehicleTaskDetailsVmaComponent,
    VehicleTaskDetailsVmaDetailComponent,
    VehicleTaskDetailsVmaDialogComponent,
    VehicleTaskDetailsVmaPopupComponent,
    VehicleTaskDetailsVmaDeletePopupComponent,
    VehicleTaskDetailsVmaDeleteDialogComponent,
    vehicleTaskDetailsRoute,
    vehicleTaskDetailsPopupRoute,
    VehicleTaskDetailsVmaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...vehicleTaskDetailsRoute,
    ...vehicleTaskDetailsPopupRoute,
];

@NgModule({
    imports: [
        VehicleManagerApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VehicleTaskDetailsVmaComponent,
        VehicleTaskDetailsVmaDetailComponent,
        VehicleTaskDetailsVmaDialogComponent,
        VehicleTaskDetailsVmaDeleteDialogComponent,
        VehicleTaskDetailsVmaPopupComponent,
        VehicleTaskDetailsVmaDeletePopupComponent,
    ],
    entryComponents: [
        VehicleTaskDetailsVmaComponent,
        VehicleTaskDetailsVmaDialogComponent,
        VehicleTaskDetailsVmaPopupComponent,
        VehicleTaskDetailsVmaDeleteDialogComponent,
        VehicleTaskDetailsVmaDeletePopupComponent,
    ],
    providers: [
        VehicleTaskDetailsVmaService,
        VehicleTaskDetailsVmaPopupService,
        VehicleTaskDetailsVmaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleManagerApplicationVehicleTaskDetailsVmaModule {}
