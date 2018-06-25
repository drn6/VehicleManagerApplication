import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleVma } from './vehicle-vma.model';
import { VehicleVmaService } from './vehicle-vma.service';

@Component({
    selector: 'jhi-vehicle-vma-detail',
    templateUrl: './vehicle-vma-detail.component.html'
})
export class VehicleVmaDetailComponent implements OnInit, OnDestroy {

    vehicle: VehicleVma;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private vehicleService: VehicleVmaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVehicles();
    }

    load(id) {
        this.vehicleService.find(id)
            .subscribe((vehicleResponse: HttpResponse<VehicleVma>) => {
                this.vehicle = vehicleResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVehicles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'vehicleListModification',
            (response) => this.load(this.vehicle.id)
        );
    }
}
