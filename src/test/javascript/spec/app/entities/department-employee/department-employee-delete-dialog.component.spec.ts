/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { EmployeesTestModule } from '../../../test.module';
import { DepartmentEmployeeDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/department-employee/department-employee-delete-dialog.component';
import { DepartmentEmployeeService } from '../../../../../../main/webapp/app/entities/department-employee/department-employee.service';

describe('Component Tests', () => {

    describe('DepartmentEmployee Management Delete Component', () => {
        let comp: DepartmentEmployeeDeleteDialogComponent;
        let fixture: ComponentFixture<DepartmentEmployeeDeleteDialogComponent>;
        let service: DepartmentEmployeeService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmployeesTestModule],
                declarations: [DepartmentEmployeeDeleteDialogComponent],
                providers: [
                    DepartmentEmployeeService
                ]
            })
            .overrideTemplate(DepartmentEmployeeDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DepartmentEmployeeDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentEmployeeService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
