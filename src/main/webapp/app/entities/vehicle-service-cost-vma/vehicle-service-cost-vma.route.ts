import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { VehicleServiceCostVmaComponent } from './vehicle-service-cost-vma.component';
import { VehicleServiceCostVmaDetailComponent } from './vehicle-service-cost-vma-detail.component';
import { VehicleServiceCostVmaPopupComponent } from './vehicle-service-cost-vma-dialog.component';
import { VehicleServiceCostVmaDeletePopupComponent } from './vehicle-service-cost-vma-delete-dialog.component';

@Injectable()
export class VehicleServiceCostVmaResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const vehicleServiceCostRoute: Routes = [
    {
        path: 'vehicle-service-cost-vma',
        component: VehicleServiceCostVmaComponent,
        resolve: {
            'pagingParams': VehicleServiceCostVmaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicleServiceCost.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'vehicle-service-cost-vma/:id',
        component: VehicleServiceCostVmaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicleServiceCost.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vehicleServiceCostPopupRoute: Routes = [
    {
        path: 'vehicle-service-cost-vma-new',
        component: VehicleServiceCostVmaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicleServiceCost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vehicle-service-cost-vma/:id/edit',
        component: VehicleServiceCostVmaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicleServiceCost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vehicle-service-cost-vma/:id/delete',
        component: VehicleServiceCostVmaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicleServiceCost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
