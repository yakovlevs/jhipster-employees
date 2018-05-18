/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EmployeesTestModule } from '../../../test.module';
import { SalaryDetailComponent } from '../../../../../../main/webapp/app/entities/salary/salary-detail.component';
import { SalaryService } from '../../../../../../main/webapp/app/entities/salary/salary.service';
import { Salary } from '../../../../../../main/webapp/app/entities/salary/salary.model';

describe('Component Tests', () => {

    describe('Salary Management Detail Component', () => {
        let comp: SalaryDetailComponent;
        let fixture: ComponentFixture<SalaryDetailComponent>;
        let service: SalaryService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmployeesTestModule],
                declarations: [SalaryDetailComponent],
                providers: [
                    SalaryService
                ]
            })
            .overrideTemplate(SalaryDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalaryDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalaryService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Salary(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.salary).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
