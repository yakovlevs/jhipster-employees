import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Salary } from './salary.model';
import { SalaryService } from './salary.service';

@Injectable()
export class SalaryPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private salaryService: SalaryService

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
                this.salaryService.find(id)
                    .subscribe((salaryResponse: HttpResponse<Salary>) => {
                        const salary: Salary = salaryResponse.body;
                        salary.fromDate = this.datePipe
                            .transform(salary.fromDate, 'yyyy-MM-ddTHH:mm:ss');
                        salary.toDate = this.datePipe
                            .transform(salary.toDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.salaryModalRef(component, salary);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.salaryModalRef(component, new Salary());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    salaryModalRef(component: Component, salary: Salary): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.salary = salary;
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
