import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {VehicleVma} from './vehicle-vma.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<VehicleVma>;

@Injectable()
export class VehicleVmaService {

    private resourceUrl = SERVER_API_URL + 'api/vehicles';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(vehicle: VehicleVma): Observable<EntityResponseType> {
        const copy = this.convert(vehicle);
        return this.http.post<VehicleVma>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(vehicle: VehicleVma): Observable<EntityResponseType> {
        const copy = this.convert(vehicle);
        return this.http.put<VehicleVma>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VehicleVma>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any, startDateTime?: any, endDateTime?: any): Observable<HttpResponse<VehicleVma[]>> {
        let options: HttpParams = createRequestOption(req);
        // Begin assigning parameters
        if (startDateTime && endDateTime) {
            options = options.append('startDateTime', startDateTime);
            options = options.append('endDateTime', endDateTime);
        }

        return this.http.get<VehicleVma[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<VehicleVma[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VehicleVma = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VehicleVma[]>): HttpResponse<VehicleVma[]> {
        const jsonResponse: VehicleVma[] = res.body;
        const body: VehicleVma[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VehicleVma.
     */
    private convertItemFromServer(vehicle: VehicleVma): VehicleVma {
        const copy: VehicleVma = Object.assign({}, vehicle);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(vehicle.createdDate);
        copy.lastModifiedDate = this.dateUtils
            .convertDateTimeFromServer(vehicle.lastModifiedDate);
        return copy;
    }

    /**
     * Convert a VehicleVma to a JSON which can be sent to the server.
     */
    private convert(vehicle: VehicleVma): VehicleVma {
        const copy: VehicleVma = Object.assign({}, vehicle);

        copy.createdDate = this.dateUtils.toDate(vehicle.createdDate);

        copy.lastModifiedDate = this.dateUtils.toDate(vehicle.lastModifiedDate);
        return copy;
    }
}
