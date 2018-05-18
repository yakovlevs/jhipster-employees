import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DepartmentManager } from './department-manager.model';
import { DepartmentManagerService } from './department-manager.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-department-manager',
    templateUrl: './department-manager.component.html'
})
export class DepartmentManagerComponent implements OnInit, OnDestroy {
departmentManagers: DepartmentManager[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private departmentManagerService: DepartmentManagerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.departmentManagerService.query().subscribe(
            (res: HttpResponse<DepartmentManager[]>) => {
                this.departmentManagers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDepartmentManagers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: DepartmentManager) {
        return item.id;
    }
    registerChangeInDepartmentManagers() {
        this.eventSubscriber = this.eventManager.subscribe('departmentManagerListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
