import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CostVma } from './cost-vma.model';
import { CostVmaService } from './cost-vma.service';

@Component({
    selector: 'jhi-cost-vma-detail',
    templateUrl: './cost-vma-detail.component.html'
})
export class CostVmaDetailComponent implements OnInit, OnDestroy {

    cost: CostVma;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private costService: CostVmaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCosts();
    }

    load(id) {
        this.costService.find(id)
            .subscribe((costResponse: HttpResponse<CostVma>) => {
                this.cost = costResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCosts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'costListModification',
            (response) => this.load(this.cost.id)
        );
    }
}
