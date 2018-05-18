/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EmployeesTestModule } from '../../../test.module';
import { SalaryComponent } from '../../../../../../main/webapp/app/entities/salary/salary.component';
import { SalaryService } from '../../../../../../main/webapp/app/entities/salary/salary.service';
import { Salary } from '../../../../../../main/webapp/app/entities/salary/salary.model';

describe('Component Tests', () => {

    describe('Salary Management Component', () => {
        let comp: SalaryComponent;
        let fixture: ComponentFixture<SalaryComponent>;
        let service: SalaryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmployeesTestModule],
                declarations: [SalaryComponent],
                providers: [
                    SalaryService
                ]
            })
            .overrideTemplate(SalaryComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalaryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalaryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Salary(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.salaries[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
