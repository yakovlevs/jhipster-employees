import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DepartmentEmployee } from './department-employee.model';
import { DepartmentEmployeePopupService } from './department-employee-popup.service';
import { DepartmentEmployeeService } from './department-employee.service';
import { Employee, EmployeeService } from '../employee';
import { Department, DepartmentService } from '../department';

@Component({
    selector: 'jhi-department-employee-dialog',
    templateUrl: './department-employee-dialog.component.html'
})
export class DepartmentEmployeeDialogComponent implements OnInit {

    departmentEmployee: DepartmentEmployee;
    isSaving: boolean;

    employees: Employee[];

    departments: Department[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private departmentEmployeeService: DepartmentEmployeeService,
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
        if (this.departmentEmployee.id !== undefined) {
            this.subscribeToSaveResponse(
                this.departmentEmployeeService.update(this.departmentEmployee));
        } else {
            this.subscribeToSaveResponse(
                this.departmentEmployeeService.create(this.departmentEmployee));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DepartmentEmployee>>) {
        result.subscribe((res: HttpResponse<DepartmentEmployee>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: DepartmentEmployee) {
        this.eventManager.broadcast({ name: 'departmentEmployeeListModification', content: 'OK'});
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
    selector: 'jhi-department-employee-popup',
    template: ''
})
export class DepartmentEmployeePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private departmentEmployeePopupService: DepartmentEmployeePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.departmentEmployeePopupService
                    .open(DepartmentEmployeeDialogComponent as Component, params['id']);
            } else {
                this.departmentEmployeePopupService
                    .open(DepartmentEmployeeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
