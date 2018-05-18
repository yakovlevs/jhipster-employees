/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { EmployeesTestModule } from '../../../test.module';
import { DepartmentManagerComponent } from '../../../../../../main/webapp/app/entities/department-manager/department-manager.component';
import { DepartmentManagerService } from '../../../../../../main/webapp/app/entities/department-manager/department-manager.service';
import { DepartmentManager } from '../../../../../../main/webapp/app/entities/department-manager/department-manager.model';

describe('Component Tests', () => {

    describe('DepartmentManager Management Component', () => {
        let comp: DepartmentManagerComponent;
        let fixture: ComponentFixture<DepartmentManagerComponent>;
        let service: DepartmentManagerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmployeesTestModule],
                declarations: [DepartmentManagerComponent],
                providers: [
                    DepartmentManagerService
                ]
            })
            .overrideTemplate(DepartmentManagerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DepartmentManagerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentManagerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new DepartmentManager(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.departmentManagers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
