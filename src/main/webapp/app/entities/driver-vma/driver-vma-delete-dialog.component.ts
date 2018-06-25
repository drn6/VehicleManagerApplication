import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DriverVma } from './driver-vma.model';
import { DriverVmaPopupService } from './driver-vma-popup.service';
import { DriverVmaService } from './driver-vma.service';

@Component({
    selector: 'jhi-driver-vma-delete-dialog',
    templateUrl: './driver-vma-delete-dialog.component.html'
})
export class DriverVmaDeleteDialogComponent {

    driver: DriverVma;

    constructor(
        private driverService: DriverVmaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.driverService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'driverListModification',
                content: 'Deleted an driver'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-driver-vma-delete-popup',
    template: ''
})
export class DriverVmaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private driverPopupService: DriverVmaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.driverPopupService
                .open(DriverVmaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
