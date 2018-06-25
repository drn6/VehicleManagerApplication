import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { VehicleTaskVma } from './vehicle-task-vma.model';
import { VehicleTaskVmaPopupService } from './vehicle-task-vma-popup.service';
import { VehicleTaskVmaService } from './vehicle-task-vma.service';
import { VehicleVma, VehicleVmaService } from '../vehicle-vma';
import { DriverVma, DriverVmaService } from '../driver-vma';

@Component({
    selector: 'jhi-vehicle-task-vma-dialog',
    templateUrl: './vehicle-task-vma-dialog.component.html'
})
export class VehicleTaskVmaDialogComponent implements OnInit {

    vehicleTask: VehicleTaskVma;
    isSaving: boolean;

    vehicles: VehicleVma[];

    drivers: DriverVma[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private vehicleTaskService: VehicleTaskVmaService,
        private vehicleService: VehicleVmaService,
        private driverService: DriverVmaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.vehicleService.query()
            .subscribe((res: HttpResponse<VehicleVma[]>) => { this.vehicles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.driverService.query()
            .subscribe((res: HttpResponse<DriverVma[]>) => { this.drivers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.vehicleTask.id !== undefined) {
            this.subscribeToSaveResponse(
                this.vehicleTaskService.update(this.vehicleTask));
        } else {
            this.subscribeToSaveResponse(
                this.vehicleTaskService.create(this.vehicleTask));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VehicleTaskVma>>) {
        result.subscribe((res: HttpResponse<VehicleTaskVma>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VehicleTaskVma) {
        this.eventManager.broadcast({ name: 'vehicleTaskListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackVehicleById(index: number, item: VehicleVma) {
        return item.id;
    }

    trackDriverById(index: number, item: DriverVma) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-vehicle-task-vma-popup',
    template: ''
})
export class VehicleTaskVmaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehicleTaskPopupService: VehicleTaskVmaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.vehicleTaskPopupService
                    .open(VehicleTaskVmaDialogComponent as Component, params['id']);
            } else {
                this.vehicleTaskPopupService
                    .open(VehicleTaskVmaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
