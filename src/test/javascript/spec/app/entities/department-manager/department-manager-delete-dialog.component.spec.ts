/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { EmployeesTestModule } from '../../../test.module';
import { DepartmentManagerDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/department-manager/department-manager-delete-dialog.component';
import { DepartmentManagerService } from '../../../../../../main/webapp/app/entities/department-manager/department-manager.service';

describe('Component Tests', () => {

    describe('DepartmentManager Management Delete Component', () => {
        let comp: DepartmentManagerDeleteDialogComponent;
        let fixture: ComponentFixture<DepartmentManagerDeleteDialogComponent>;
        let service: DepartmentManagerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EmployeesTestModule],
                declarations: [DepartmentManagerDeleteDialogComponent],
                providers: [
                    DepartmentManagerService
                ]
            })
            .overrideTemplate(DepartmentManagerDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DepartmentManagerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartmentManagerService);
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
