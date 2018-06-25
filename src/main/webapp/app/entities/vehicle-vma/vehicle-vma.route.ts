import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { VehicleVmaComponent } from './vehicle-vma.component';
import { VehicleVmaDetailComponent } from './vehicle-vma-detail.component';
import { VehicleVmaPopupComponent } from './vehicle-vma-dialog.component';
import { VehicleVmaDeletePopupComponent } from './vehicle-vma-delete-dialog.component';

@Injectable()
export class VehicleVmaResolvePagingParams implements Resolve<any> {

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

export const vehicleRoute: Routes = [
    {
        path: 'vehicle-vma',
        component: VehicleVmaComponent,
        resolve: {
            'pagingParams': VehicleVmaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'vehicle-vma/:id',
        component: VehicleVmaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vehiclePopupRoute: Routes = [
    {
        path: 'vehicle-vma-new',
        component: VehicleVmaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vehicle-vma/:id/edit',
        component: VehicleVmaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vehicle-vma/:id/delete',
        component: VehicleVmaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicle.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
