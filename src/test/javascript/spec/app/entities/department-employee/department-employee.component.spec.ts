/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EmployeesTestModule } from '../../../test.module';
import { DepartmentEmployeeComponent } from '../../../../../../main/webapp/app/entities/department-employee/department-employee.component';
import { DepartmentEmployeeService } from '../../../../../../main/webapp/app/entities/department-employee/department-employee.service';
import { DepartmentEmployee } from '../../../../../../main/webapp/app/entities/department-employee/department-employee.model';

describe('Component Tests', () => {

    describe('DepartmentEmployee Management Component', () => {
        let comp: DepartmentEmployeeComponent;
        let fixture: ComponentFixture<DepartmentEmployeeComponent>;
        let service: DepartmentEmployeeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmployeesTestModule],
                declarations: [DepartmentEmployeeComponent],
                providers: [
                    DepartmentEmployeeService
                ]
            })
            .overrideTemplate(DepartmentEmployeeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DepartmentEmployeeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentEmployeeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DepartmentEmployee(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.departmentEmployees[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
