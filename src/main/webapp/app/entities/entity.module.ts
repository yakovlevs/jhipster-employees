import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { EmployeesDepartmentModule } from './department/department.module';
import { EmployeesDepartmentManagerModule } from './department-manager/department-manager.module';
import { EmployeesDepartmentEmployeeModule } from './department-employee/department-employee.module';
import { EmployeesEmployeeModule } from './employee/employee.module';
import { EmployeesSalaryModule } from './salary/salary.module';
import { EmployeesTitleModule } from './title/title.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        EmployeesDepartmentModule,
        EmployeesDepartmentManagerModule,
        EmployeesDepartmentEmployeeModule,
        EmployeesEmployeeModule,
        EmployeesSalaryModule,
        EmployeesTitleModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EmployeesEntityModule {}
