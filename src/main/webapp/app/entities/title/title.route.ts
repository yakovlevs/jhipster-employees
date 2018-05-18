import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TitleComponent } from './title.component';
import { TitleDetailComponent } from './title-detail.component';
import { TitlePopupComponent } from './title-dialog.component';
import { TitleDeletePopupComponent } from './title-delete-dialog.component';

export const titleRoute: Routes = [
    {
        path: 'title',
        component: TitleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Titles'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'title/:id',
        component: TitleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Titles'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const titlePopupRoute: Routes = [
    {
        path: 'title-new',
        component: TitlePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Titles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'title/:id/edit',
        component: TitlePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Titles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'title/:id/delete',
        component: TitleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Titles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
