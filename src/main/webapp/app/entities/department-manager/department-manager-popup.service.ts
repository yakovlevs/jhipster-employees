import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DepartmentManager } from './department-manager.model';
import { DepartmentManagerService } from './department-manager.service';

@Injectable()
export class DepartmentManagerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private departmentManagerService: DepartmentManagerService

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
                this.departmentManagerService.find(id)
                    .subscribe((departmentManagerResponse: HttpResponse<DepartmentManager>) => {
                        const departmentManager: DepartmentManager = departmentManagerResponse.body;
                        departmentManager.fromDate = this.datePipe
                            .transform(departmentManager.fromDate, 'yyyy-MM-ddTHH:mm:ss');
                        departmentManager.toDate = this.datePipe
                            .transform(departmentManager.toDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.departmentManagerModalRef(component, departmentManager);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.departmentManagerModalRef(component, new DepartmentManager());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    departmentManagerModalRef(component: Component, departmentManager: DepartmentManager): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.departmentManager = departmentManager;
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
