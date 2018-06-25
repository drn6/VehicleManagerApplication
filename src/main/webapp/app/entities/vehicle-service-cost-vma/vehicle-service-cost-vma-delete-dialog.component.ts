import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleServiceCostVma } from './vehicle-service-cost-vma.model';
import { VehicleServiceCostVmaPopupService } from './vehicle-service-cost-vma-popup.service';
import { VehicleServiceCostVmaService } from './vehicle-service-cost-vma.service';

@Component({
    selector: 'jhi-vehicle-service-cost-vma-delete-dialog',
    templateUrl: './vehicle-service-cost-vma-delete-dialog.component.html'
})
export class VehicleServiceCostVmaDeleteDialogComponent {

    vehicleServiceCost: VehicleServiceCostVma;

    constructor(
        private vehicleServiceCostService: VehicleServiceCostVmaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vehicleServiceCostService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'vehicleServiceCostListModification',
                content: 'Deleted an vehicleServiceCost'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vehicle-service-cost-vma-delete-popup',
    template: ''
})
export class VehicleServiceCostVmaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehicleServiceCostPopupService: VehicleServiceCostVmaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.vehicleServiceCostPopupService
                .open(VehicleServiceCostVmaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
