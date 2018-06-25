import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { VehicleServiceCostVma } from './vehicle-service-cost-vma.model';
import { VehicleServiceCostVmaService } from './vehicle-service-cost-vma.service';

@Injectable()
export class VehicleServiceCostVmaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private vehicleServiceCostService: VehicleServiceCostVmaService

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
                this.vehicleServiceCostService.find(id)
                    .subscribe((vehicleServiceCostResponse: HttpResponse<VehicleServiceCostVma>) => {
                        const vehicleServiceCost: VehicleServiceCostVma = vehicleServiceCostResponse.body;
                        vehicleServiceCost.createdDate = this.datePipe
                            .transform(vehicleServiceCost.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        vehicleServiceCost.lastModifiedDate = this.datePipe
                            .transform(vehicleServiceCost.lastModifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.vehicleServiceCostModalRef(component, vehicleServiceCost);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.vehicleServiceCostModalRef(component, new VehicleServiceCostVma());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    vehicleServiceCostModalRef(component: Component, vehicleServiceCost: VehicleServiceCostVma): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.vehicleServiceCost = vehicleServiceCost;
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
