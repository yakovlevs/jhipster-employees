import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DepartmentManager } from './department-manager.model';
import { DepartmentManagerPopupService } from './department-manager-popup.service';
import { DepartmentManagerService } from './department-manager.service';
import { Employee, EmployeeService } from '../employee';
import { Department, DepartmentService } from '../department';

@Component({
    selector: 'jhi-department-manager-dialog',
    templateUrl: './department-manager-dialog.component.html'
})
export class DepartmentManagerDialogComponent implements OnInit {

    departmentManager: DepartmentManager;
    isSaving: boolean;

    employees: Employee[];

    departments: Department[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private departmentManagerService: DepartmentManagerService,
        private employeeService: EmployeeService,
        private departmentService: DepartmentService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.employeeService.query()
            .subscribe((res: HttpResponse<Employee[]>) => { this.employees = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.departmentService.query()
            .subscribe((res: HttpResponse<Department[]>) => { this.departments = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.departmentManager.id !== undefined) {
            this.subscribeToSaveResponse(
                this.departmentManagerService.update(this.departmentManager));
        } else {
            this.subscribeToSaveResponse(
                this.departmentManagerService.create(this.departmentManager));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DepartmentManager>>) {
        result.subscribe((res: HttpResponse<DepartmentManager>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DepartmentManager) {
        this.eventManager.broadcast({ name: 'departmentManagerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEmployeeById(index: number, item: Employee) {
        return item.id;
    }

    trackDepartmentById(index: number, item: Department) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-department-manager-popup',
    template: ''
})
export class DepartmentManagerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private departmentManagerPopupService: DepartmentManagerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.departmentManagerPopupService
                    .open(DepartmentManagerDialogComponent as Component, params['id']);
            } else {
                this.departmentManagerPopupService
                    .open(DepartmentManagerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
