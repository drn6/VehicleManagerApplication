import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleVma } from './vehicle-vma.model';
import { VehicleVmaPopupService } from './vehicle-vma-popup.service';
import { VehicleVmaService } from './vehicle-vma.service';

@Component({
    selector: 'jhi-vehicle-vma-delete-dialog',
    templateUrl: './vehicle-vma-delete-dialog.component.html'
})
export class VehicleVmaDeleteDialogComponent {

    vehicle: VehicleVma;

    constructor(
        private vehicleService: VehicleVmaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vehicleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'vehicleListModification',
                content: 'Deleted an vehicle'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vehicle-vma-delete-popup',
    template: ''
})
export class VehicleVmaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehiclePopupService: VehicleVmaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.vehiclePopupService
                .open(VehicleVmaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
