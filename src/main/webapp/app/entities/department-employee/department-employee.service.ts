import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DepartmentEmployee } from './department-employee.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DepartmentEmployee>;

@Injectable()
export class DepartmentEmployeeService {

    private resourceUrl =  SERVER_API_URL + 'api/department-employees';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(departmentEmployee: DepartmentEmployee): Observable<EntityResponseType> {
        const copy = this.convert(departmentEmployee);
        return this.http.post<DepartmentEmployee>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(departmentEmployee: DepartmentEmployee): Observable<EntityResponseType> {
        const copy = this.convert(departmentEmployee);
        return this.http.put<DepartmentEmployee>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DepartmentEmployee>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DepartmentEmployee[]>> {
        const options = createRequestOption(req);
        return this.http.get<DepartmentEmployee[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DepartmentEmployee[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DepartmentEmployee = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DepartmentEmployee[]>): HttpResponse<DepartmentEmployee[]> {
        const jsonResponse: DepartmentEmployee[] = res.body;
        const body: DepartmentEmployee[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DepartmentEmployee.
     */
    private convertItemFromServer(departmentEmployee: DepartmentEmployee): DepartmentEmployee {
        const copy: DepartmentEmployee = Object.assign({}, departmentEmployee);
        copy.fromDate = this.dateUtils
            .convertDateTimeFromServer(departmentEmployee.fromDate);
        copy.toDate = this.dateUtils
            .convertDateTimeFromServer(departmentEmployee.toDate);
        return copy;
    }

    /**
     * Convert a DepartmentEmployee to a JSON which can be sent to the server.
     */
    private convert(departmentEmployee: DepartmentEmployee): DepartmentEmployee {
        const copy: DepartmentEmployee = Object.assign({}, departmentEmployee);

        copy.fromDate = this.dateUtils.toDate(departmentEmployee.fromDate);

        copy.toDate = this.dateUtils.toDate(departmentEmployee.toDate);
        return copy;
    }
}
