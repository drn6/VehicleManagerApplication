import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { VehicleTaskVma } from './vehicle-task-vma.model';
import { VehicleTaskVmaService } from './vehicle-task-vma.service';

@Injectable()
export class VehicleTaskVmaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private vehicleTaskService: VehicleTaskVmaService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.vehicleTaskService.find(id)
                    .subscribe((vehicleTaskResponse: HttpResponse<VehicleTaskVma>) => {
                        const vehicleTask: VehicleTaskVma = vehicleTaskResponse.body;
                        vehicleTask.startDateTime = this.datePipe
                            .transform(vehicleTask.startDateTime, 'yyyy-MM-ddTHH:mm:ss');
                        vehicleTask.endDateTime = this.datePipe
                            .transform(vehicleTask.endDateTime, 'yyyy-MM-ddTHH:mm:ss');
                        vehicleTask.createdDate = this.datePipe
                            .transform(vehicleTask.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        vehicleTask.lastModifiedDate = this.datePipe
                            .transform(vehicleTask.lastModifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.vehicleTaskModalRef(component, vehicleTask);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.vehicleTaskModalRef(component, new VehicleTaskVma());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    vehicleTaskModalRef(component: Component, vehicleTask: VehicleTaskVma): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.vehicleTask = vehicleTask;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
