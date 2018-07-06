import {Component, OnInit} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {JhiEventManager} from 'ng-jhipster';

import {Account, LoginModalService, Principal} from '../shared';
import {VehicleTaskVmaService} from "../entities/vehicle-task-vma/vehicle-task-vma.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: [
        'home.scss'
    ]

})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    tasks: any;
    taskDetails: any;
    tasksDays: any;

    constructor(private principal: Principal,
                private loginModalService: LoginModalService,
                private vehicleTaskService: VehicleTaskVmaService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
            this.loadVehicle();
        });

        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', (message) => {
            this.principal.identity().then((account) => {
                this.account = account;
                this.loadVehicle();
            });
        });
    }

    loadDetails(task) {
        this.taskDetails = task;
    }

    loadVehicle() {
        this.vehicleTaskService.dashboard()
            .subscribe((res: HttpResponse<any>) => {
                this.tasksDays = Object.keys(res.body);
                this.tasks = res.body;
            }, (res: HttpErrorResponse) => console.log(res.message));
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
