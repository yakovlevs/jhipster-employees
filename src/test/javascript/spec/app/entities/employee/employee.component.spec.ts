/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EmployeesTestModule } from '../../../test.module';
import { EmployeeComponent } from '../../../../../../main/webapp/app/entities/employee/employee.component';
import { EmployeeService } from '../../../../../../main/webapp/app/entities/employee/employee.service';
import { Employee } from '../../../../../../main/webapp/app/entities/employee/employee.model';

describe('Component Tests', () => {

    describe('Employee Management Component', () => {
        let comp: EmployeeComponent;
        let fixture: ComponentFixture<EmployeeComponent>;
        let service: EmployeeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmployeesTestModule],
                declarations: [EmployeeComponent],
                providers: [
                    EmployeeService
                ]
            })
            .overrideTemplate(EmployeeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmployeeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Employee(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.employees[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
