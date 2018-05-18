import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Title } from './title.model';
import { TitleService } from './title.service';

@Injectable()
export class TitlePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private titleService: TitleService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.titleService.find(id)
                    .subscribe((titleResponse: HttpResponse<Title>) => {
                        const title: Title = titleResponse.body;
                        title.fromDate = this.datePipe
                            .transform(title.fromDate, 'yyyy-MM-ddTHH:mm:ss');
                        title.toDate = this.datePipe
                            .transform(title.toDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.titleModalRef(component, title);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.titleModalRef(component, new Title());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    titleModalRef(component: Component, title: Title): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.title = title;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
