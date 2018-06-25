import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleTaskVma } from './vehicle-task-vma.model';
import { VehicleTaskVmaService } from './vehicle-task-vma.service';

@Component({
    selector: 'jhi-vehicle-task-vma-detail',
    templateUrl: './vehicle-task-vma-detail.component.html'
})
export class VehicleTaskVmaDetailComponent implements OnInit, OnDestroy {

    vehicleTask: VehicleTaskVma;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private vehicleTaskService: VehicleTaskVmaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVehicleTasks();
    }

    load(id) {
        this.vehicleTaskService.find(id)
            .subscribe((vehicleTaskResponse: HttpResponse<VehicleTaskVma>) => {
                this.vehicleTask = vehicleTaskResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVehicleTasks() {
        this.eventSubscriber = this.eventManager.subscribe(
            'vehicleTaskListModification',
            (response) => this.load(this.vehicleTask.id)
        );
    }
}
