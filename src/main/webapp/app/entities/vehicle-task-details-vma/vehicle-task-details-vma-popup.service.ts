import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { VehicleTaskDetailsVma } from './vehicle-task-details-vma.model';
import { VehicleTaskDetailsVmaService } from './vehicle-task-details-vma.service';

@Injectable()
export class VehicleTaskDetailsVmaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private vehicleTaskDetailsService: VehicleTaskDetailsVmaService

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
                this.vehicleTaskDetailsService.find(id)
                    .subscribe((vehicleTaskDetailsResponse: HttpResponse<VehicleTaskDetailsVma>) => {
                        const vehicleTaskDetails: VehicleTaskDetailsVma = vehicleTaskDetailsResponse.body;
                        vehicleTaskDetails.startDateTime = this.datePipe
                            .transform(vehicleTaskDetails.startDateTime, 'yyyy-MM-ddTHH:mm:ss');
                        vehicleTaskDetails.endDateTime = this.datePipe
                            .transform(vehicleTaskDetails.endDateTime, 'yyyy-MM-ddTHH:mm:ss');
                        vehicleTaskDetails.createdDate = this.datePipe
                            .transform(vehicleTaskDetails.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        vehicleTaskDetails.lastModifiedDate = this.datePipe
                            .transform(vehicleTaskDetails.lastModifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.vehicleTaskDetailsModalRef(component, vehicleTaskDetails);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.vehicleTaskDetailsModalRef(component, new VehicleTaskDetailsVma());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    vehicleTaskDetailsModalRef(component: Component, vehicleTaskDetails: VehicleTaskDetailsVma): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.vehicleTaskDetails = vehicleTaskDetails;
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
