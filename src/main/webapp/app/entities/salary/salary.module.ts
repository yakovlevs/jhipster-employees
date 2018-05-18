import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmployeesSharedModule } from '../../shared';
import {
    SalaryService,
    SalaryPopupService,
    SalaryComponent,
    SalaryDetailComponent,
    SalaryDialogComponent,
    SalaryPopupComponent,
    SalaryDeletePopupComponent,
    SalaryDeleteDialogComponent,
    salaryRoute,
    salaryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...salaryRoute,
    ...salaryPopupRoute,
];

@NgModule({
    imports: [
        EmployeesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SalaryComponent,
        SalaryDetailComponent,
        SalaryDialogComponent,
        SalaryDeleteDialogComponent,
        SalaryPopupComponent,
        SalaryDeletePopupComponent,
    ],
    entryComponents: [
        SalaryComponent,
        SalaryDialogComponent,
        SalaryPopupComponent,
        SalaryDeleteDialogComponent,
        SalaryDeletePopupComponent,
    ],
    providers: [
        SalaryService,
        SalaryPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeesSalaryModule {}
