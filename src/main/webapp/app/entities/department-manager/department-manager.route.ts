import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DepartmentManagerComponent } from './department-manager.component';
import { DepartmentManagerDetailComponent } from './department-manager-detail.component';
import { DepartmentManagerPopupComponent } from './department-manager-dialog.component';
import { DepartmentManagerDeletePopupComponent } from './department-manager-delete-dialog.component';

export const departmentManagerRoute: Routes = [
    {
        path: 'department-manager',
        component: DepartmentManagerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DepartmentManagers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'department-manager/:id',
        component: DepartmentManagerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DepartmentManagers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const departmentManagerPopupRoute: Routes = [
    {
        path: 'department-manager-new',
        component: DepartmentManagerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DepartmentManagers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'department-manager/:id/edit',
        component: DepartmentManagerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DepartmentManagers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'department-manager/:id/delete',
        component: DepartmentManagerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DepartmentManagers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
