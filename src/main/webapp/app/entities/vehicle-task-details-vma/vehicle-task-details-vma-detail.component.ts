import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleTaskDetailsVma } from './vehicle-task-details-vma.model';
import { VehicleTaskDetailsVmaService } from './vehicle-task-details-vma.service';

@Component({
    selector: 'jhi-vehicle-task-details-vma-detail',
    templateUrl: './vehicle-task-details-vma-detail.component.html'
})
export class VehicleTaskDetailsVmaDetailComponent implements OnInit, OnDestroy {

    vehicleTaskDetails: VehicleTaskDetailsVma;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private vehicleTaskDetailsService: VehicleTaskDetailsVmaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVehicleTaskDetails();
    }

    load(id) {
        this.vehicleTaskDetailsService.find(id)
            .subscribe((vehicleTaskDetailsResponse: HttpResponse<VehicleTaskDetailsVma>) => {
                this.vehicleTaskDetails = vehicleTaskDetailsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVehicleTaskDetails() {
        this.eventSubscriber = this.eventManager.subscribe(
            'vehicleTaskDetailsListModification',
            (response) => this.load(this.vehicleTaskDetails.id)
        );
    }
}
