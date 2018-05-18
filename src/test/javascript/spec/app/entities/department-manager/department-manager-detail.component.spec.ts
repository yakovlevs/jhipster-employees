/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { EmployeesTestModule } from '../../../test.module';
import { DepartmentManagerDetailComponent } from '../../../../../../main/webapp/app/entities/department-manager/department-manager-detail.component';
import { DepartmentManagerService } from '../../../../../../main/webapp/app/entities/department-manager/department-manager.service';
import { DepartmentManager } from '../../../../../../main/webapp/app/entities/department-manager/department-manager.model';

describe('Component Tests', () => {

    describe('DepartmentManager Management Detail Component', () => {
        let comp: DepartmentManagerDetailComponent;
        let fixture: ComponentFixture<DepartmentManagerDetailComponent>;
        let service: DepartmentManagerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmployeesTestModule],
                declarations: [DepartmentManagerDetailComponent],
                providers: [
                    DepartmentManagerService
                ]
            })
            .overrideTemplate(DepartmentManagerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DepartmentManagerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentManagerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new DepartmentManager(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.departmentManager).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
