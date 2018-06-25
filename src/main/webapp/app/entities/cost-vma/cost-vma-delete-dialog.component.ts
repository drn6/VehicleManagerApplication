import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CostVma } from './cost-vma.model';
import { CostVmaPopupService } from './cost-vma-popup.service';
import { CostVmaService } from './cost-vma.service';

@Component({
    selector: 'jhi-cost-vma-delete-dialog',
    templateUrl: './cost-vma-delete-dialog.component.html'
})
export class CostVmaDeleteDialogComponent {

    cost: CostVma;

    constructor(
        private costService: CostVmaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.costService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'costListModification',
                content: 'Deleted an cost'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cost-vma-delete-popup',
    template: ''
})
export class CostVmaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costPopupService: CostVmaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.costPopupService
                .open(CostVmaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
