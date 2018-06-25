import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { DriverVma } from './driver-vma.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<DriverVma>;

@Injectable()
export class DriverVmaService {

    private resourceUrl =  SERVER_API_URL + 'api/drivers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(driver: DriverVma): Observable<EntityResponseType> {
        const copy = this.convert(driver);
        return this.http.post<DriverVma>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(driver: DriverVma): Observable<EntityResponseType> {
        const copy = this.convert(driver);
        return this.http.put<DriverVma>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<DriverVma>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<DriverVma[]>> {
        const options = createRequestOption(req);
        return this.http.get<DriverVma[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<DriverVma[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: DriverVma = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<DriverVma[]>): HttpResponse<DriverVma[]> {
        const jsonResponse: DriverVma[] = res.body;
        const body: DriverVma[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to DriverVma.
     */
    private convertItemFromServer(driver: DriverVma): DriverVma {
        const copy: DriverVma = Object.assign({}, driver);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(driver.createdDate);
        copy.lastModifiedDate = this.dateUtils
            .convertDateTimeFromServer(driver.lastModifiedDate);
        return copy;
    }

    /**
     * Convert a DriverVma to a JSON which can be sent to the server.
     */
    private convert(driver: DriverVma): DriverVma {
        const copy: DriverVma = Object.assign({}, driver);

        copy.createdDate = this.dateUtils.toDate(driver.createdDate);

        copy.lastModifiedDate = this.dateUtils.toDate(driver.lastModifiedDate);
        return copy;
    }
}
