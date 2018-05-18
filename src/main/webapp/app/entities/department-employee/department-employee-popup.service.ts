import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DepartmentEmployee } from './department-employee.model';
import { DepartmentEmployeeService } from './department-employee.service';

@Injectable()
export class DepartmentEmployeePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private departmentEmployeeService: DepartmentEmployeeService

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
                this.departmentEmployeeService.find(id)
                    .subscribe((departmentEmployeeResponse: HttpResponse<DepartmentEmployee>) => {
                        const departmentEmployee: DepartmentEmployee = departmentEmployeeResponse.body;
                        departmentEmployee.fromDate = this.datePipe
                            .transform(departmentEmployee.fromDate, 'yyyy-MM-ddTHH:mm:ss');
                        departmentEmployee.toDate = this.datePipe
                            .transform(departmentEmployee.toDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.departmentEmployeeModalRef(component, departmentEmployee);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.departmentEmployeeModalRef(component, new DepartmentEmployee());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    departmentEmployeeModalRef(component: Component, departmentEmployee: DepartmentEmployee): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.departmentEmployee = departmentEmployee;
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
