import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DriverVma } from './driver-vma.model';
import { DriverVmaPopupService } from './driver-vma-popup.service';
import { DriverVmaService } from './driver-vma.service';

@Component({
    selector: 'jhi-driver-vma-dialog',
    templateUrl: './driver-vma-dialog.component.html'
})
export class DriverVmaDialogComponent implements OnInit {

    driver: DriverVma;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private driverService: DriverVmaService,
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
        if (this.driver.id !== undefined) {
            this.subscribeToSaveResponse(
                this.driverService.update(this.driver));
        } else {
            this.subscribeToSaveResponse(
                this.driverService.create(this.driver));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DriverVma>>) {
        result.subscribe((res: HttpResponse<DriverVma>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DriverVma) {
        this.eventManager.broadcast({ name: 'driverListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-driver-vma-popup',
    template: ''
})
export class DriverVmaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private driverPopupService: DriverVmaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.driverPopupService
                    .open(DriverVmaDialogComponent as Component, params['id']);
            } else {
                this.driverPopupService
                    .open(DriverVmaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
