import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { SalaryComponent } from './salary.component';
import { SalaryDetailComponent } from './salary-detail.component';
import { SalaryPopupComponent } from './salary-dialog.component';
import { SalaryDeletePopupComponent } from './salary-delete-dialog.component';

export const salaryRoute: Routes = [
    {
        path: 'salary',
        component: SalaryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salaries'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'salary/:id',
        component: SalaryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salaries'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const salaryPopupRoute: Routes = [
    {
        path: 'salary-new',
        component: SalaryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salaries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'salary/:id/edit',
        component: SalaryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salaries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'salary/:id/delete',
        component: SalaryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Salaries'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
