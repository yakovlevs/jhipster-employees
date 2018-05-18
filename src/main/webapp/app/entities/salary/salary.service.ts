import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Salary } from './salary.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Salary>;

@Injectable()
export class SalaryService {

    private resourceUrl =  SERVER_API_URL + 'api/salaries';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(salary: Salary): Observable<EntityResponseType> {
        const copy = this.convert(salary);
        return this.http.post<Salary>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(salary: Salary): Observable<EntityResponseType> {
        const copy = this.convert(salary);
        return this.http.put<Salary>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Salary>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Salary[]>> {
        const options = createRequestOption(req);
        return this.http.get<Salary[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Salary[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Salary = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Salary[]>): HttpResponse<Salary[]> {
        const jsonResponse: Salary[] = res.body;
        const body: Salary[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Salary.
     */
    private convertItemFromServer(salary: Salary): Salary {
        const copy: Salary = Object.assign({}, salary);
        copy.fromDate = this.dateUtils
            .convertDateTimeFromServer(salary.fromDate);
        copy.toDate = this.dateUtils
            .convertDateTimeFromServer(salary.toDate);
        return copy;
    }

    /**
     * Convert a Salary to a JSON which can be sent to the server.
     */
    private convert(salary: Salary): Salary {
        const copy: Salary = Object.assign({}, salary);

        copy.fromDate = this.dateUtils.toDate(salary.fromDate);

        copy.toDate = this.dateUtils.toDate(salary.toDate);
        return copy;
    }
}
