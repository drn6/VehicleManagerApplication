import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VehicleManagerApplicationSharedModule } from '../../shared';
import {
    CostVmaService,
    CostVmaPopupService,
    CostVmaComponent,
    CostVmaDetailComponent,
    CostVmaDialogComponent,
    CostVmaPopupComponent,
    CostVmaDeletePopupComponent,
    CostVmaDeleteDialogComponent,
    costRoute,
    costPopupRoute,
    CostVmaResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...costRoute,
    ...costPopupRoute,
];

@NgModule({
    imports: [
        VehicleManagerApplicationSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CostVmaComponent,
        CostVmaDetailComponent,
        CostVmaDialogComponent,
        CostVmaDeleteDialogComponent,
        CostVmaPopupComponent,
        CostVmaDeletePopupComponent,
    ],
    entryComponents: [
        CostVmaComponent,
        CostVmaDialogComponent,
        CostVmaPopupComponent,
        CostVmaDeleteDialogComponent,
        CostVmaDeletePopupComponent,
    ],
    providers: [
        CostVmaService,
        CostVmaPopupService,
        CostVmaResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleManagerApplicationCostVmaModule {}
