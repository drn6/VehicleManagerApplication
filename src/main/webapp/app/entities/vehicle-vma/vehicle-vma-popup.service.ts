import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { VehicleVma } from './vehicle-vma.model';
import { VehicleVmaService } from './vehicle-vma.service';

@Injectable()
export class VehicleVmaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private vehicleService: VehicleVmaService

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
                this.vehicleService.find(id)
                    .subscribe((vehicleResponse: HttpResponse<VehicleVma>) => {
                        const vehicle: VehicleVma = vehicleResponse.body;
                        vehicle.createdDate = this.datePipe
                            .transform(vehicle.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        vehicle.lastModifiedDate = this.datePipe
                            .transform(vehicle.lastModifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.vehicleModalRef(component, vehicle);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.vehicleModalRef(component, new VehicleVma());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    vehicleModalRef(component: Component, vehicle: VehicleVma): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.vehicle = vehicle;
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
