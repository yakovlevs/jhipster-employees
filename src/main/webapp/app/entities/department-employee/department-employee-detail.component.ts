import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DepartmentEmployee } from './department-employee.model';
import { DepartmentEmployeeService } from './department-employee.service';

@Component({
    selector: 'jhi-department-employee-detail',
    templateUrl: './department-employee-detail.component.html'
})
export class DepartmentEmployeeDetailComponent implements OnInit, OnDestroy {

    departmentEmployee: DepartmentEmployee;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private departmentEmployeeService: DepartmentEmployeeService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDepartmentEmployees();
    }

    load(id) {
        this.departmentEmployeeService.find(id)
            .subscribe((departmentEmployeeResponse: HttpResponse<DepartmentEmployee>) => {
                this.departmentEmployee = departmentEmployeeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDepartmentEmployees() {
        this.eventSubscriber = this.eventManager.subscribe(
            'departmentEmployeeListModification',
            (response) => this.load(this.departmentEmployee.id)
        );
    }
}
