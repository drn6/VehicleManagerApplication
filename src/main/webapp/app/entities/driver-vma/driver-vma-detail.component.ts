import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DriverVma } from './driver-vma.model';
import { DriverVmaService } from './driver-vma.service';

@Component({
    selector: 'jhi-driver-vma-detail',
    templateUrl: './driver-vma-detail.component.html'
})
export class DriverVmaDetailComponent implements OnInit, OnDestroy {

    driver: DriverVma;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private driverService: DriverVmaService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDrivers();
    }

    load(id) {
        this.driverService.find(id)
            .subscribe((driverResponse: HttpResponse<DriverVma>) => {
                this.driver = driverResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDrivers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'driverListModification',
            (response) => this.load(this.driver.id)
        );
    }
}
