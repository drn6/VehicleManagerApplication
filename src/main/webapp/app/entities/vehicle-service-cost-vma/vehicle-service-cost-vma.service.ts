import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { VehicleServiceCostVma } from './vehicle-service-cost-vma.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<VehicleServiceCostVma>;

@Injectable()
export class VehicleServiceCostVmaService {

    private resourceUrl =  SERVER_API_URL + 'api/vehicle-service-costs';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(vehicleServiceCost: VehicleServiceCostVma): Observable<EntityResponseType> {
        const copy = this.convert(vehicleServiceCost);
        return this.http.post<VehicleServiceCostVma>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(vehicleServiceCost: VehicleServiceCostVma): Observable<EntityResponseType> {
        const copy = this.convert(vehicleServiceCost);
        return this.http.put<VehicleServiceCostVma>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VehicleServiceCostVma>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<VehicleServiceCostVma[]>> {
        const options = createRequestOption(req);
        return this.http.get<VehicleServiceCostVma[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<VehicleServiceCostVma[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VehicleServiceCostVma = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VehicleServiceCostVma[]>): HttpResponse<VehicleServiceCostVma[]> {
        const jsonResponse: VehicleServiceCostVma[] = res.body;
        const body: VehicleServiceCostVma[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VehicleServiceCostVma.
     */
    private convertItemFromServer(vehicleServiceCost: VehicleServiceCostVma): VehicleServiceCostVma {
        const copy: VehicleServiceCostVma = Object.assign({}, vehicleServiceCost);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(vehicleServiceCost.createdDate);
        copy.lastModifiedDate = this.dateUtils
            .convertDateTimeFromServer(vehicleServiceCost.lastModifiedDate);
        return copy;
    }

    /**
     * Convert a VehicleServiceCostVma to a JSON which can be sent to the server.
     */
    private convert(vehicleServiceCost: VehicleServiceCostVma): VehicleServiceCostVma {
        const copy: VehicleServiceCostVma = Object.assign({}, vehicleServiceCost);

        copy.createdDate = this.dateUtils.toDate(vehicleServiceCost.createdDate);

        copy.lastModifiedDate = this.dateUtils.toDate(vehicleServiceCost.lastModifiedDate);
        return copy;
    }
}
