import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmployeesSharedModule } from '../../shared';
import {
    DepartmentEmployeeService,
    DepartmentEmployeePopupService,
    DepartmentEmployeeComponent,
    DepartmentEmployeeDetailComponent,
    DepartmentEmployeeDialogComponent,
    DepartmentEmployeePopupComponent,
    DepartmentEmployeeDeletePopupComponent,
    DepartmentEmployeeDeleteDialogComponent,
    departmentEmployeeRoute,
    departmentEmployeePopupRoute,
} from './';

const ENTITY_STATES = [
    ...departmentEmployeeRoute,
    ...departmentEmployeePopupRoute,
];

@NgModule({
    imports: [
        EmployeesSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DepartmentEmployeeComponent,
        DepartmentEmployeeDetailComponent,
        DepartmentEmployeeDialogComponent,
        DepartmentEmployeeDeleteDialogComponent,
        DepartmentEmployeePopupComponent,
        DepartmentEmployeeDeletePopupComponent,
    ],
    entryComponents: [
        DepartmentEmployeeComponent,
        DepartmentEmployeeDialogComponent,
        DepartmentEmployeePopupComponent,
        DepartmentEmployeeDeleteDialogComponent,
        DepartmentEmployeeDeletePopupComponent,
    ],
    providers: [
        DepartmentEmployeeService,
        DepartmentEmployeePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeesDepartmentEmployeeModule {}
