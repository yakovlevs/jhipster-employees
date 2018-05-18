import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DepartmentManager } from './department-manager.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DepartmentManager>;

@Injectable()
export class DepartmentManagerService {

    private resourceUrl =  SERVER_API_URL + 'api/department-managers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(departmentManager: DepartmentManager): Observable<EntityResponseType> {
        const copy = this.convert(departmentManager);
        return this.http.post<DepartmentManager>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(departmentManager: DepartmentManager): Observable<EntityResponseType> {
        const copy = this.convert(departmentManager);
        return this.http.put<DepartmentManager>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DepartmentManager>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DepartmentManager[]>> {
        const options = createRequestOption(req);
        return this.http.get<DepartmentManager[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DepartmentManager[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DepartmentManager = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DepartmentManager[]>): HttpResponse<DepartmentManager[]> {
        const jsonResponse: DepartmentManager[] = res.body;
        const body: DepartmentManager[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DepartmentManager.
     */
    private convertItemFromServer(departmentManager: DepartmentManager): DepartmentManager {
        const copy: DepartmentManager = Object.assign({}, departmentManager);
        copy.fromDate = this.dateUtils
            .convertDateTimeFromServer(departmentManager.fromDate);
        copy.toDate = this.dateUtils
            .convertDateTimeFromServer(departmentManager.toDate);
        return copy;
    }

    /**
     * Convert a DepartmentManager to a JSON which can be sent to the server.
     */
    private convert(departmentManager: DepartmentManager): DepartmentManager {
        const copy: DepartmentManager = Object.assign({}, departmentManager);

        copy.fromDate = this.dateUtils.toDate(departmentManager.fromDate);

        copy.toDate = this.dateUtils.toDate(departmentManager.toDate);
        return copy;
    }
}
