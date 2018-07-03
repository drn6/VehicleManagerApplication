import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import {VehicleTaskVma} from './vehicle-task-vma.model';
import {VehicleTaskVmaPopupService} from './vehicle-task-vma-popup.service';
import {VehicleTaskVmaService} from './vehicle-task-vma.service';
import {VehicleVma, VehicleVmaService} from '../vehicle-vma';
import {DriverVma, DriverVmaService} from '../driver-vma';

@Component({
    selector: 'jhi-vehicle-task-driver-vma-dialog',
    templateUrl: './vehicle-task-driver-vma-dialog.component.html'
})
export class VehicleTaskDriverVmaDialogComponent implements OnInit {

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
            .subscribe((res: HttpResponse<VehicleVma[]>) => {
                this.vehicles = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.driverService.query()
            .subscribe((res: HttpResponse<DriverVma[]>) => {
                this.drivers = res.body;
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    addOrRemove(taskId,driverId,remove){
        console.log("remove",remove);
        this.subscribeToSaveResponse(
            this.vehicleTaskService.addOrRemoveDriver(taskId,driverId,remove));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }


    private subscribeToSaveResponse(result: Observable<HttpResponse<VehicleTaskVma>>) {
        result.subscribe((res: HttpResponse<VehicleTaskVma>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VehicleTaskVma) {
        this.eventManager.broadcast({name: 'vehicleTaskListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error('notallow', null, null);
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
                    return true;
                }
            }
        }
        return false
    }
}

@Component({
    selector: 'jhi-vehicle-task-driver-vma-popup',
    template: ''
})
export class VehicleTaskDriverVmaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehicleTaskPopupService: VehicleTaskVmaPopupService
    ) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
                this.vehicleTaskPopupService
                    .open(VehicleTaskDriverVmaDialogComponent as Component, params['id']);
            } else {
                this.vehicleTaskPopupService
                    .open(VehicleTaskDriverVmaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
