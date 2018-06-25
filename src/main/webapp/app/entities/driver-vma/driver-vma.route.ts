import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DriverVmaComponent } from './driver-vma.component';
import { DriverVmaDetailComponent } from './driver-vma-detail.component';
import { DriverVmaPopupComponent } from './driver-vma-dialog.component';
import { DriverVmaDeletePopupComponent } from './driver-vma-delete-dialog.component';

@Injectable()
export class DriverVmaResolvePagingParams implements Resolve<any> {

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

export const driverRoute: Routes = [
    {
        path: 'driver-vma',
        component: DriverVmaComponent,
        resolve: {
            'pagingParams': DriverVmaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.driver.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'driver-vma/:id',
        component: DriverVmaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.driver.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const driverPopupRoute: Routes = [
    {
        path: 'driver-vma-new',
        component: DriverVmaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.driver.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'driver-vma/:id/edit',
        component: DriverVmaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.driver.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'driver-vma/:id/delete',
        component: DriverVmaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.driver.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
