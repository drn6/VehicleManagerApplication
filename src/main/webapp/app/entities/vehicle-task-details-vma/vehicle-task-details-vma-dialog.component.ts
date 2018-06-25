import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { VehicleTaskDetailsVma } from './vehicle-task-details-vma.model';
import { VehicleTaskDetailsVmaPopupService } from './vehicle-task-details-vma-popup.service';
import { VehicleTaskDetailsVmaService } from './vehicle-task-details-vma.service';
import { VehicleTaskVma, VehicleTaskVmaService } from '../vehicle-task-vma';

@Component({
    selector: 'jhi-vehicle-task-details-vma-dialog',
    templateUrl: './vehicle-task-details-vma-dialog.component.html'
})
export class VehicleTaskDetailsVmaDialogComponent implements OnInit {

    vehicleTaskDetails: VehicleTaskDetailsVma;
    isSaving: boolean;

    vehicletasks: VehicleTaskVma[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private vehicleTaskDetailsService: VehicleTaskDetailsVmaService,
        private vehicleTaskService: VehicleTaskVmaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.vehicleTaskService.query()
            .subscribe((res: HttpResponse<VehicleTaskVma[]>) => { this.vehicletasks = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.vehicleTaskDetails.id !== undefined) {
            this.subscribeToSaveResponse(
                this.vehicleTaskDetailsService.update(this.vehicleTaskDetails));
        } else {
            this.subscribeToSaveResponse(
                this.vehicleTaskDetailsService.create(this.vehicleTaskDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VehicleTaskDetailsVma>>) {
        result.subscribe((res: HttpResponse<VehicleTaskDetailsVma>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VehicleTaskDetailsVma) {
        this.eventManager.broadcast({ name: 'vehicleTaskDetailsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackVehicleTaskById(index: number, item: VehicleTaskVma) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-vehicle-task-details-vma-popup',
    template: ''
})
export class VehicleTaskDetailsVmaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehicleTaskDetailsPopupService: VehicleTaskDetailsVmaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.vehicleTaskDetailsPopupService
                    .open(VehicleTaskDetailsVmaDialogComponent as Component, params['id']);
            } else {
                this.vehicleTaskDetailsPopupService
                    .open(VehicleTaskDetailsVmaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
