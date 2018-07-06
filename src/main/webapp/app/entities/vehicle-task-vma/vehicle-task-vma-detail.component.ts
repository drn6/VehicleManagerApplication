import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {VehicleTaskVma} from './vehicle-task-vma.model';
import {VehicleTaskVmaService} from './vehicle-task-vma.service';
import {VehicleTaskDetailsVmaService} from "../vehicle-task-details-vma/vehicle-task-details-vma.service";
import {VehicleTaskDetailsVma} from "../vehicle-task-details-vma/vehicle-task-details-vma.model";
import {CostVma} from "../cost-vma/cost-vma.model";
import {CostVmaService} from "../cost-vma/cost-vma.service";

@Component({
    selector: 'jhi-vehicle-task-vma-detail',
    templateUrl: './vehicle-task-vma-detail.component.html'
})
export class VehicleTaskVmaDetailComponent implements OnInit, OnDestroy {

    vehicleTask: VehicleTaskVma;
    vehicleTaskDetails: VehicleTaskDetailsVma[];
    costs: CostVma[];
    costTotal = 0;

    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager,
                private vehicleTaskService: VehicleTaskVmaService,
                private vehicleTaskDetailsService: VehicleTaskDetailsVmaService,
                private costService: CostVmaService,
                private jhiAlertService: JhiAlertService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVehicleTasks();
    }

    sendEmails() {
        if (this.vehicleTask) {
            this.vehicleTaskService.sendAlerts(this.vehicleTask.id).subscribe(
                () => {
                    this.jhiAlertService.success('vehicleManagerApplicationApp.vehicleTask.email', null, null);
                    this.router.navigate(['/vehicle-task-vma']);
                },
                () => this.jhiAlertService.error('Error to send emails', null, null));
        }
    }

    load(id) {
        this.vehicleTaskService.find(id)
            .subscribe((vehicleTaskResponse: HttpResponse<VehicleTaskVma>) => {
                this.vehicleTask = vehicleTaskResponse.body;
            });
        this.vehicleTaskDetailsService.findByTaskId(id).subscribe(
            (res: HttpResponse<VehicleTaskDetailsVma[]>) => this.onSuccessLoadVehicleTaskDetails(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.costService.findByTaskId(id).subscribe(
            (res: HttpResponse<CostVma[]>) => this.onSuccessLoadCosts(res.body),
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    private onSuccessLoadVehicleTaskDetails(data) {
        // this.page = pagingParams.page;
        this.vehicleTaskDetails = data;
    }

    private onSuccessLoadCosts(data) {
        // this.page = pagingParams.page;
        this.costs = data;
        this.costTotal = 0;
        this.costs.forEach(c => this.costTotal += c.cost);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
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
