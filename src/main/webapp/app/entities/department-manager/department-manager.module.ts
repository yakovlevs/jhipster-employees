import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmployeesSharedModule } from '../../shared';
import {
    DepartmentManagerService,
    DepartmentManagerPopupService,
    DepartmentManagerComponent,
    DepartmentManagerDetailComponent,
    DepartmentManagerDialogComponent,
    DepartmentManagerPopupComponent,
    DepartmentManagerDeletePopupComponent,
    DepartmentManagerDeleteDialogComponent,
    departmentManagerRoute,
    departmentManagerPopupRoute,
} from './';

const ENTITY_STATES = [
    ...departmentManagerRoute,
    ...departmentManagerPopupRoute,
];

@NgModule({
    imports: [
        EmployeesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DepartmentManagerComponent,
        DepartmentManagerDetailComponent,
        DepartmentManagerDialogComponent,
        DepartmentManagerDeleteDialogComponent,
        DepartmentManagerPopupComponent,
        DepartmentManagerDeletePopupComponent,
    ],
    entryComponents: [
        DepartmentManagerComponent,
        DepartmentManagerDialogComponent,
        DepartmentManagerPopupComponent,
        DepartmentManagerDeleteDialogComponent,
        DepartmentManagerDeletePopupComponent,
    ],
    providers: [
        DepartmentManagerService,
        DepartmentManagerPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeesDepartmentManagerModule {}
