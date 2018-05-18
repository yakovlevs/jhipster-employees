import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Salary } from './salary.model';
import { SalaryPopupService } from './salary-popup.service';
import { SalaryService } from './salary.service';
import { Employee, EmployeeService } from '../employee';

@Component({
    selector: 'jhi-salary-dialog',
    templateUrl: './salary-dialog.component.html'
})
export class SalaryDialogComponent implements OnInit {

    salary: Salary;
    isSaving: boolean;

    employees: Employee[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private salaryService: SalaryService,
        private employeeService: EmployeeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.employeeService.query()
            .subscribe((res: HttpResponse<Employee[]>) => { this.employees = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.salary.id !== undefined) {
            this.subscribeToSaveResponse(
                this.salaryService.update(this.salary));
        } else {
            this.subscribeToSaveResponse(
                this.salaryService.create(this.salary));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Salary>>) {
        result.subscribe((res: HttpResponse<Salary>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Salary) {
        this.eventManager.broadcast({ name: 'salaryListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-salary-popup',
    template: ''
})
export class SalaryPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private salaryPopupService: SalaryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.salaryPopupService
                    .open(SalaryDialogComponent as Component, params['id']);
            } else {
                this.salaryPopupService
                    .open(SalaryDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
