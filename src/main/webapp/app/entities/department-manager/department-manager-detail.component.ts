import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { DepartmentManager } from './department-manager.model';
import { DepartmentManagerService } from './department-manager.service';

@Component({
    selector: 'jhi-department-manager-detail',
    templateUrl: './department-manager-detail.component.html'
})
export class DepartmentManagerDetailComponent implements OnInit, OnDestroy {

    departmentManager: DepartmentManager;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private departmentManagerService: DepartmentManagerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInDepartmentManagers();
    }

    load(id) {
        this.departmentManagerService.find(id)
            .subscribe((departmentManagerResponse: HttpResponse<DepartmentManager>) => {
                this.departmentManager = departmentManagerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInDepartmentManagers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'departmentManagerListModification',
            (response) => this.load(this.departmentManager.id)
        );
    }
}
