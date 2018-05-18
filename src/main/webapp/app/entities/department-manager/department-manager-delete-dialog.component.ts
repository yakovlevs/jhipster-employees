import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DepartmentManager } from './department-manager.model';
import { DepartmentManagerPopupService } from './department-manager-popup.service';
import { DepartmentManagerService } from './department-manager.service';

@Component({
    selector: 'jhi-department-manager-delete-dialog',
    templateUrl: './department-manager-delete-dialog.component.html'
})
export class DepartmentManagerDeleteDialogComponent {

    departmentManager: DepartmentManager;

    constructor(
        private departmentManagerService: DepartmentManagerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.departmentManagerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'departmentManagerListModification',
                content: 'Deleted an departmentManager'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-department-manager-delete-popup',
    template: ''
})
export class DepartmentManagerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private departmentManagerPopupService: DepartmentManagerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.departmentManagerPopupService
                .open(DepartmentManagerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
