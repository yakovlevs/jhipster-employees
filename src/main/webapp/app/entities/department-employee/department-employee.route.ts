import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DepartmentEmployeeComponent } from './department-employee.component';
import { DepartmentEmployeeDetailComponent } from './department-employee-detail.component';
import { DepartmentEmployeePopupComponent } from './department-employee-dialog.component';
import { DepartmentEmployeeDeletePopupComponent } from './department-employee-delete-dialog.component';

export const departmentEmployeeRoute: Routes = [
    {
        path: 'department-employee',
        component: DepartmentEmployeeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DepartmentEmployees'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'department-employee/:id',
        component: DepartmentEmployeeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DepartmentEmployees'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const departmentEmployeePopupRoute: Routes = [
    {
        path: 'department-employee-new',
        component: DepartmentEmployeePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DepartmentEmployees'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'department-employee/:id/edit',
        component: DepartmentEmployeePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DepartmentEmployees'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'department-employee/:id/delete',
        component: DepartmentEmployeeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DepartmentEmployees'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
