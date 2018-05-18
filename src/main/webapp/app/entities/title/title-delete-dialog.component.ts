import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Title } from './title.model';
import { TitlePopupService } from './title-popup.service';
import { TitleService } from './title.service';

@Component({
    selector: 'jhi-title-delete-dialog',
    templateUrl: './title-delete-dialog.component.html'
})
export class TitleDeleteDialogComponent {

    title: Title;

    constructor(
        private titleService: TitleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.titleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'titleListModification',
                content: 'Deleted an title'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-title-delete-popup',
    template: ''
})
export class TitleDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private titlePopupService: TitlePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.titlePopupService
                .open(TitleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
