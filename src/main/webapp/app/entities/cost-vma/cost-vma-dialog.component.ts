import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CostVma } from './cost-vma.model';
import { CostVmaPopupService } from './cost-vma-popup.service';
import { CostVmaService } from './cost-vma.service';
import { VehicleTaskVma, VehicleTaskVmaService } from '../vehicle-task-vma';

@Component({
    selector: 'jhi-cost-vma-dialog',
    templateUrl: './cost-vma-dialog.component.html'
})
export class CostVmaDialogComponent implements OnInit {

    cost: CostVma;
    isSaving: boolean;

    vehicletasks: VehicleTaskVma[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private costService: CostVmaService,
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
        if (this.cost.id !== undefined) {
            this.subscribeToSaveResponse(
                this.costService.update(this.cost));
        } else {
            this.subscribeToSaveResponse(
                this.costService.create(this.cost));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CostVma>>) {
        result.subscribe((res: HttpResponse<CostVma>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CostVma) {
        this.eventManager.broadcast({ name: 'costListModification', content: 'OK'});
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
    selector: 'jhi-cost-vma-popup',
    template: ''
})
export class CostVmaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costPopupService: CostVmaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.costPopupService
                    .open(CostVmaDialogComponent as Component, params['id']);
            } else {
                this.costPopupService
                    .open(CostVmaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
