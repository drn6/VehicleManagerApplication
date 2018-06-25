import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleTaskDetailsVma } from './vehicle-task-details-vma.model';
import { VehicleTaskDetailsVmaPopupService } from './vehicle-task-details-vma-popup.service';
import { VehicleTaskDetailsVmaService } from './vehicle-task-details-vma.service';

@Component({
    selector: 'jhi-vehicle-task-details-vma-delete-dialog',
    templateUrl: './vehicle-task-details-vma-delete-dialog.component.html'
})
export class VehicleTaskDetailsVmaDeleteDialogComponent {

    vehicleTaskDetails: VehicleTaskDetailsVma;

    constructor(
        private vehicleTaskDetailsService: VehicleTaskDetailsVmaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vehicleTaskDetailsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'vehicleTaskDetailsListModification',
                content: 'Deleted an vehicleTaskDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vehicle-task-details-vma-delete-popup',
    template: ''
})
export class VehicleTaskDetailsVmaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehicleTaskDetailsPopupService: VehicleTaskDetailsVmaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.vehicleTaskDetailsPopupService
                .open(VehicleTaskDetailsVmaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
