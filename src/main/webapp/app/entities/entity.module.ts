import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { VehicleManagerApplicationVehicleVmaModule } from './vehicle-vma/vehicle-vma.module';
import { VehicleManagerApplicationVehicleTaskVmaModule } from './vehicle-task-vma/vehicle-task-vma.module';
import { VehicleManagerApplicationVehicleTaskDetailsVmaModule } from './vehicle-task-details-vma/vehicle-task-details-vma.module';
import { VehicleManagerApplicationDriverVmaModule } from './driver-vma/driver-vma.module';
import { VehicleManagerApplicationVehicleServiceCostVmaModule } from './vehicle-service-cost-vma/vehicle-service-cost-vma.module';
import { VehicleManagerApplicationCostVmaModule } from './cost-vma/cost-vma.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        VehicleManagerApplicationVehicleVmaModule,
        VehicleManagerApplicationVehicleTaskVmaModule,
        VehicleManagerApplicationVehicleTaskDetailsVmaModule,
        VehicleManagerApplicationDriverVmaModule,
        VehicleManagerApplicationVehicleServiceCostVmaModule,
        VehicleManagerApplicationCostVmaModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VehicleManagerApplicationEntityModule {}
