import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Title } from './title.model';
import { TitleService } from './title.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-title',
    templateUrl: './title.component.html'
})
export class TitleComponent implements OnInit, OnDestroy {
titles: Title[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private titleService: TitleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.titleService.query().subscribe(
            (res: HttpResponse<Title[]>) => {
                this.titles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTitles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Title) {
        return item.id;
    }
    registerChangeInTitles() {
        this.eventSubscriber = this.eventManager.subscribe('titleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
