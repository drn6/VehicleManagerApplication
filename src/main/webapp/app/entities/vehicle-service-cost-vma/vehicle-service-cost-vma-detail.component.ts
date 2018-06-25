import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleServiceCostVma } from './vehicle-service-cost-vma.model';
import { VehicleServiceCostVmaService } from './vehicle-service-cost-vma.service';

@Component({
    selector: 'jhi-vehicle-service-cost-vma-detail',
    templateUrl: './vehicle-service-cost-vma-detail.component.html'
})
export class VehicleServiceCostVmaDetailComponent implements OnInit, OnDestroy {

    vehicleServiceCost: VehicleServiceCostVma;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private vehicleServiceCostService: VehicleServiceCostVmaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVehicleServiceCosts();
    }

    load(id) {
        this.vehicleServiceCostService.find(id)
            .subscribe((vehicleServiceCostResponse: HttpResponse<VehicleServiceCostVma>) => {
                this.vehicleServiceCost = vehicleServiceCostResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVehicleServiceCosts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'vehicleServiceCostListModification',
            (response) => this.load(this.vehicleServiceCost.id)
        );
    }
}
