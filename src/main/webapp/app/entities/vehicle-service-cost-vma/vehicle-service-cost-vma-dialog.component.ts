import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { VehicleServiceCostVma } from './vehicle-service-cost-vma.model';
import { VehicleServiceCostVmaPopupService } from './vehicle-service-cost-vma-popup.service';
import { VehicleServiceCostVmaService } from './vehicle-service-cost-vma.service';
import { VehicleVma, VehicleVmaService } from '../vehicle-vma';

@Component({
    selector: 'jhi-vehicle-service-cost-vma-dialog',
    templateUrl: './vehicle-service-cost-vma-dialog.component.html'
})
export class VehicleServiceCostVmaDialogComponent implements OnInit {

    vehicleServiceCost: VehicleServiceCostVma;
    isSaving: boolean;

    vehicles: VehicleVma[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private vehicleServiceCostService: VehicleServiceCostVmaService,
        private vehicleService: VehicleVmaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.vehicleService.query()
            .subscribe((res: HttpResponse<VehicleVma[]>) => { this.vehicles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.vehicleServiceCost.id !== undefined) {
            this.subscribeToSaveResponse(
                this.vehicleServiceCostService.update(this.vehicleServiceCost));
        } else {
            this.subscribeToSaveResponse(
                this.vehicleServiceCostService.create(this.vehicleServiceCost));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VehicleServiceCostVma>>) {
        result.subscribe((res: HttpResponse<VehicleServiceCostVma>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VehicleServiceCostVma) {
        this.eventManager.broadcast({ name: 'vehicleServiceCostListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-vehicle-service-cost-vma-popup',
    template: ''
})
export class VehicleServiceCostVmaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehicleServiceCostPopupService: VehicleServiceCostVmaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.vehicleServiceCostPopupService
                    .open(VehicleServiceCostVmaDialogComponent as Component, params['id']);
            } else {
                this.vehicleServiceCostPopupService
                    .open(VehicleServiceCostVmaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
