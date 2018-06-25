import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VehicleManagerApplicationSharedModule } from '../../shared';
import {
    VehicleServiceCostVmaService,
    VehicleServiceCostVmaPopupService,
    VehicleServiceCostVmaComponent,
    VehicleServiceCostVmaDetailComponent,
    VehicleServiceCostVmaDialogComponent,
    VehicleServiceCostVmaPopupComponent,
    VehicleServiceCostVmaDeletePopupComponent,
    VehicleServiceCostVmaDeleteDialogComponent,
    vehicleServiceCostRoute,
    vehicleServiceCostPopupRoute,
    VehicleServiceCostVmaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...vehicleServiceCostRoute,
    ...vehicleServiceCostPopupRoute,
];

@NgModule({
    imports: [
        VehicleManagerApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VehicleServiceCostVmaComponent,
        VehicleServiceCostVmaDetailComponent,
        VehicleServiceCostVmaDialogComponent,
        VehicleServiceCostVmaDeleteDialogComponent,
        VehicleServiceCostVmaPopupComponent,
        VehicleServiceCostVmaDeletePopupComponent,
    ],
    entryComponents: [
        VehicleServiceCostVmaComponent,
        VehicleServiceCostVmaDialogComponent,
        VehicleServiceCostVmaPopupComponent,
        VehicleServiceCostVmaDeleteDialogComponent,
        VehicleServiceCostVmaDeletePopupComponent,
    ],
    providers: [
        VehicleServiceCostVmaService,
        VehicleServiceCostVmaPopupService,
        VehicleServiceCostVmaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleManagerApplicationVehicleServiceCostVmaModule {}
