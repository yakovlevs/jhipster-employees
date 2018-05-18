import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Title } from './title.model';
import { TitlePopupService } from './title-popup.service';
import { TitleService } from './title.service';
import { Employee, EmployeeService } from '../employee';

@Component({
    selector: 'jhi-title-dialog',
    templateUrl: './title-dialog.component.html'
})
export class TitleDialogComponent implements OnInit {

    title: Title;
    isSaving: boolean;

    employees: Employee[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private titleService: TitleService,
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
        if (this.title.id !== undefined) {
            this.subscribeToSaveResponse(
                this.titleService.update(this.title));
        } else {
            this.subscribeToSaveResponse(
                this.titleService.create(this.title));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Title>>) {
        result.subscribe((res: HttpResponse<Title>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Title) {
        this.eventManager.broadcast({ name: 'titleListModification', content: 'OK'});
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
    selector: 'jhi-title-popup',
    template: ''
})
export class TitlePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private titlePopupService: TitlePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.titlePopupService
                    .open(TitleDialogComponent as Component, params['id']);
            } else {
                this.titlePopupService
                    .open(TitleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
