import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Salary } from './salary.model';
import { SalaryPopupService } from './salary-popup.service';
import { SalaryService } from './salary.service';

@Component({
    selector: 'jhi-salary-delete-dialog',
    templateUrl: './salary-delete-dialog.component.html'
})
export class SalaryDeleteDialogComponent {

    salary: Salary;

    constructor(
        private salaryService: SalaryService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.salaryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'salaryListModification',
                content: 'Deleted an salary'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-salary-delete-popup',
    template: ''
})
export class SalaryDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private salaryPopupService: SalaryPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.salaryPopupService
                .open(SalaryDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
