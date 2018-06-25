import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VehicleTaskVma } from './vehicle-task-vma.model';
import { VehicleTaskVmaPopupService } from './vehicle-task-vma-popup.service';
import { VehicleTaskVmaService } from './vehicle-task-vma.service';

@Component({
    selector: 'jhi-vehicle-task-vma-delete-dialog',
    templateUrl: './vehicle-task-vma-delete-dialog.component.html'
})
export class VehicleTaskVmaDeleteDialogComponent {

    vehicleTask: VehicleTaskVma;

    constructor(
        private vehicleTaskService: VehicleTaskVmaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.vehicleTaskService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'vehicleTaskListModification',
                content: 'Deleted an vehicleTask'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vehicle-task-vma-delete-popup',
    template: ''
})
export class VehicleTaskVmaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private vehicleTaskPopupService: VehicleTaskVmaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.vehicleTaskPopupService
                .open(VehicleTaskVmaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
