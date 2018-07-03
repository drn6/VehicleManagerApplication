import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {CostVma} from './cost-vma.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<CostVma>;

@Injectable()
export class CostVmaService {

    private resourceUrl = SERVER_API_URL + 'api/costs';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(cost: CostVma): Observable<EntityResponseType> {
        const copy = this.convert(cost);
        return this.http.post<CostVma>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(cost: CostVma): Observable<EntityResponseType> {
        const copy = this.convert(cost);
        return this.http.put<CostVma>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CostVma>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CostVma[]>> {
        const options = createRequestOption(req);
        return this.http.get<CostVma[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<CostVma[]>) => this.convertArrayResponse(res));
    }

    findByTaskId(taskId: number): Observable<HttpResponse<CostVma[]>> {
        return this.http.get<CostVma[]>(`${this.resourceUrl}/task/${taskId}`, {observe: 'response'})
            .map((res: HttpResponse<CostVma[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CostVma = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CostVma[]>): HttpResponse<CostVma[]> {
        const jsonResponse: CostVma[] = res.body;
        const body: CostVma[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CostVma.
     */
    private convertItemFromServer(cost: CostVma): CostVma {
        const copy: CostVma = Object.assign({}, cost);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(cost.createdDate);
        copy.lastModifiedDate = this.dateUtils
            .convertDateTimeFromServer(cost.lastModifiedDate);
        return copy;
    }

    /**
     * Convert a CostVma to a JSON which can be sent to the server.
     */
    private convert(cost: CostVma): CostVma {
        const copy: CostVma = Object.assign({}, cost);

        copy.createdDate = this.dateUtils.toDate(cost.createdDate);

        copy.lastModifiedDate = this.dateUtils.toDate(cost.lastModifiedDate);
        return copy;
    }
}
