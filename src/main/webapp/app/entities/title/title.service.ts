import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Title } from './title.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Title>;

@Injectable()
export class TitleService {

    private resourceUrl =  SERVER_API_URL + 'api/titles';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(title: Title): Observable<EntityResponseType> {
        const copy = this.convert(title);
        return this.http.post<Title>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(title: Title): Observable<EntityResponseType> {
        const copy = this.convert(title);
        return this.http.put<Title>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Title>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Title[]>> {
        const options = createRequestOption(req);
        return this.http.get<Title[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Title[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Title = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Title[]>): HttpResponse<Title[]> {
        const jsonResponse: Title[] = res.body;
        const body: Title[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Title.
     */
    private convertItemFromServer(title: Title): Title {
        const copy: Title = Object.assign({}, title);
        copy.fromDate = this.dateUtils
            .convertDateTimeFromServer(title.fromDate);
        copy.toDate = this.dateUtils
            .convertDateTimeFromServer(title.toDate);
        return copy;
    }

    /**
     * Convert a Title to a JSON which can be sent to the server.
     */
    private convert(title: Title): Title {
        const copy: Title = Object.assign({}, title);

        copy.fromDate = this.dateUtils.toDate(title.fromDate);

        copy.toDate = this.dateUtils.toDate(title.toDate);
        return copy;
    }
}
