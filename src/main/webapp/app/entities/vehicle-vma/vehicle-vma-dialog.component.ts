import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleVma } from './vehicle-vma.model';
import { VehicleVmaPopupService } from './vehicle-vma-popup.service';
import { VehicleVmaService } from './vehicle-vma.service';

@Component({
    selector: 'jhi-vehicle-vma-dialog',
    templateUrl: './vehicle-vma-dialog.component.html'
})
export class VehicleVmaDialogComponent implements OnInit {

    vehicle: VehicleVma;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private vehicleService: VehicleVmaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.vehicle.id !== undefined) {
            this.subscribeToSaveResponse(
                this.vehicleService.update(this.vehicle));
        } else {
            this.subscribeToSaveResponse(
                this.vehicleService.create(this.vehicle));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VehicleVma>>) {
        result.subscribe((res: HttpResponse<VehicleVma>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VehicleVma) {
        this.eventManager.broadcast({ name: 'vehicleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-vehicle-vma-popup',
    template: ''
})
export class VehicleVmaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehiclePopupService: VehicleVmaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.vehiclePopupService
                    .open(VehicleVmaDialogComponent as Component, params['id']);
            } else {
                this.vehiclePopupService
                    .open(VehicleVmaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
