import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { VehicleTaskVmaComponent } from './vehicle-task-vma.component';
import { VehicleTaskVmaDetailComponent } from './vehicle-task-vma-detail.component';
import { VehicleTaskVmaPopupComponent } from './vehicle-task-vma-dialog.component';
import { VehicleTaskVmaDeletePopupComponent } from './vehicle-task-vma-delete-dialog.component';

@Injectable()
export class VehicleTaskVmaResolvePagingParams implements Resolve<any> {

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

export const vehicleTaskRoute: Routes = [
    {
        path: 'vehicle-task-vma',
        component: VehicleTaskVmaComponent,
        resolve: {
            'pagingParams': VehicleTaskVmaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicleTask.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'vehicle-task-vma/:id',
        component: VehicleTaskVmaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicleTask.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const vehicleTaskPopupRoute: Routes = [
    {
        path: 'vehicle-task-vma-new',
        component: VehicleTaskVmaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicleTask.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vehicle-task-vma/:id/edit',
        component: VehicleTaskVmaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicleTask.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vehicle-task-vma/:id/delete',
        component: VehicleTaskVmaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.vehicleTask.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
