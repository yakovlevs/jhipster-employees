import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DepartmentEmployee } from './department-employee.model';
import { DepartmentEmployeePopupService } from './department-employee-popup.service';
import { DepartmentEmployeeService } from './department-employee.service';

@Component({
    selector: 'jhi-department-employee-delete-dialog',
    templateUrl: './department-employee-delete-dialog.component.html'
})
export class DepartmentEmployeeDeleteDialogComponent {

    departmentEmployee: DepartmentEmployee;

    constructor(
        private departmentEmployeeService: DepartmentEmployeeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.departmentEmployeeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'departmentEmployeeListModification',
                content: 'Deleted an departmentEmployee'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-department-employee-delete-popup',
    template: ''
})
export class DepartmentEmployeeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private departmentEmployeePopupService: DepartmentEmployeePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.departmentEmployeePopupService
                .open(DepartmentEmployeeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
