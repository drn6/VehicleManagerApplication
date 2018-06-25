import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { VehicleTaskDetailsVmaComponent } from './vehicle-task-details-vma.component';
import { VehicleTaskDetailsVmaDetailComponent } from './vehicle-task-details-vma-detail.component';
import { VehicleTaskDetailsVmaPopupComponent } from './vehicle-task-details-vma-dialog.component';
import { VehicleTaskDetailsVmaDeletePopupComponent } from './vehicle-task-details-vma-delete-dialog.component';

@Injectable()
export class VehicleTaskDetailsVmaResolvePagingParams implements Resolve<any> {

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

export const vehicleTaskDetailsRoute: Routes = [
    {
        path: 'vehicle-task-details-vma',
        component: VehicleTaskDetailsVmaComponent,
        resolve: {
            'pagingParams': VehicleTaskDetailsVmaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicleTaskDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'vehicle-task-details-vma/:id',
        component: VehicleTaskDetailsVmaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicleTaskDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vehicleTaskDetailsPopupRoute: Routes = [
    {
        path: 'vehicle-task-details-vma-new',
        component: VehicleTaskDetailsVmaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicleTaskDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vehicle-task-details-vma/:id/edit',
        component: VehicleTaskDetailsVmaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicleTaskDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vehicle-task-details-vma/:id/delete',
        component: VehicleTaskDetailsVmaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicleTaskDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
