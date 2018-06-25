import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { CostVmaComponent } from './cost-vma.component';
import { CostVmaDetailComponent } from './cost-vma-detail.component';
import { CostVmaPopupComponent } from './cost-vma-dialog.component';
import { CostVmaDeletePopupComponent } from './cost-vma-delete-dialog.component';

@Injectable()
export class CostVmaResolvePagingParams implements Resolve<any> {

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

export const costRoute: Routes = [
    {
        path: 'cost-vma',
        component: CostVmaComponent,
        resolve: {
            'pagingParams': CostVmaResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.cost.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cost-vma/:id',
        component: CostVmaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.cost.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const costPopupRoute: Routes = [
    {
        path: 'cost-vma-new',
        component: CostVmaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.cost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cost-vma/:id/edit',
        component: CostVmaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.cost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cost-vma/:id/delete',
        component: CostVmaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'vehicleManagerApplicationApp.cost.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
