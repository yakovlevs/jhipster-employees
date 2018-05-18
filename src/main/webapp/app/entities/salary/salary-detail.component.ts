import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Salary } from './salary.model';
import { SalaryService } from './salary.service';

@Component({
    selector: 'jhi-salary-detail',
    templateUrl: './salary-detail.component.html'
})
export class SalaryDetailComponent implements OnInit, OnDestroy {

    salary: Salary;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private salaryService: SalaryService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInSalaries();
    }

    load(id) {
        this.salaryService.find(id)
            .subscribe((salaryResponse: HttpResponse<Salary>) => {
                this.salary = salaryResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInSalaries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'salaryListModification',
            (response) => this.load(this.salary.id)
        );
    }
}
