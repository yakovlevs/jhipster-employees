import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Salary } from './salary.model';
import { SalaryService } from './salary.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-salary',
    templateUrl: './salary.component.html'
})
export class SalaryComponent implements OnInit, OnDestroy {
salaries: Salary[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private salaryService: SalaryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.salaryService.query().subscribe(
            (res: HttpResponse<Salary[]>) => {
                this.salaries = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSalaries();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Salary) {
        return item.id;
    }
    registerChangeInSalaries() {
        this.eventSubscriber = this.eventManager.subscribe('salaryListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
