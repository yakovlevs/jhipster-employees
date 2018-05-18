/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EmployeesTestModule } from '../../../test.module';
import { DepartmentEmployeeDetailComponent } from '../../../../../../main/webapp/app/entities/department-employee/department-employee-detail.component';
import { DepartmentEmployeeService } from '../../../../../../main/webapp/app/entities/department-employee/department-employee.service';
import { DepartmentEmployee } from '../../../../../../main/webapp/app/entities/department-employee/department-employee.model';

describe('Component Tests', () => {

    describe('DepartmentEmployee Management Detail Component', () => {
        let comp: DepartmentEmployeeDetailComponent;
        let fixture: ComponentFixture<DepartmentEmployeeDetailComponent>;
        let service: DepartmentEmployeeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmployeesTestModule],
                declarations: [DepartmentEmployeeDetailComponent],
                providers: [
                    DepartmentEmployeeService
                ]
            })
            .overrideTemplate(DepartmentEmployeeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DepartmentEmployeeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentEmployeeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DepartmentEmployee(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.departmentEmployee).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
