import {Component, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {HttpResponse} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import {CostVma} from './cost-vma.model';
import {CostVmaService} from './cost-vma.service';

@Injectable()
export class CostVmaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private costService: CostVmaService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, taskId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.costService.find(id)
                    .subscribe((costResponse: HttpResponse<CostVma>) => {
                        const cost: CostVma = costResponse.body;
                        cost.createdDate = this.datePipe
                            .transform(cost.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                        cost.lastModifiedDate = this.datePipe
                            .transform(cost.lastModifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.costModalRef(component, cost);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    let cost = new CostVma();
                    cost.vehicleTask = {id: Number.parseInt(taskId)};
                    this.ngbModalRef = this.costModalRef(component, cost);
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    costModalRef(component: Component, cost: CostVma): NgbModalRef {
        const modalRef = this.modalService.open(component, {size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.cost = cost;
        modalRef.result.then((result) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{outlets: {popup: null}}], {replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
