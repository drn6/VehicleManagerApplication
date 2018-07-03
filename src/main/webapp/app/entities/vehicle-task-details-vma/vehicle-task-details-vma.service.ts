import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {VehicleTaskDetailsVma} from './vehicle-task-details-vma.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<VehicleTaskDetailsVma>;

@Injectable()
export class VehicleTaskDetailsVmaService {

    private resourceUrl = SERVER_API_URL + 'api/vehicle-task-details';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(vehicleTaskDetails: VehicleTaskDetailsVma): Observable<EntityResponseType> {
        const copy = this.convert(vehicleTaskDetails);
        return this.http.post<VehicleTaskDetailsVma>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(vehicleTaskDetails: VehicleTaskDetailsVma): Observable<EntityResponseType> {
        const copy = this.convert(vehicleTaskDetails);
        return this.http.put<VehicleTaskDetailsVma>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VehicleTaskDetailsVma>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findByTaskId(taskId: number): Observable<HttpResponse<VehicleTaskDetailsVma[]>> {
        return this.http.get<VehicleTaskDetailsVma[]>(`${this.resourceUrl}/task/${taskId}`, {observe: 'response'})
            .map((res: HttpResponse<VehicleTaskDetailsVma[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<VehicleTaskDetailsVma[]>> {
        const options = createRequestOption(req);
        return this.http.get<VehicleTaskDetailsVma[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<VehicleTaskDetailsVma[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VehicleTaskDetailsVma = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VehicleTaskDetailsVma[]>): HttpResponse<VehicleTaskDetailsVma[]> {
        const jsonResponse: VehicleTaskDetailsVma[] = res.body;
        const body: VehicleTaskDetailsVma[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VehicleTaskDetailsVma.
     */
    private convertItemFromServer(vehicleTaskDetails: VehicleTaskDetailsVma): VehicleTaskDetailsVma {
        const copy: VehicleTaskDetailsVma = Object.assign({}, vehicleTaskDetails);
        copy.startDateTime = this.dateUtils
            .convertDateTimeFromServer(vehicleTaskDetails.startDateTime);
        copy.endDateTime = this.dateUtils
            .convertDateTimeFromServer(vehicleTaskDetails.endDateTime);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(vehicleTaskDetails.createdDate);
        copy.lastModifiedDate = this.dateUtils
            .convertDateTimeFromServer(vehicleTaskDetails.lastModifiedDate);
        return copy;
    }

    /**
     * Convert a VehicleTaskDetailsVma to a JSON which can be sent to the server.
     */
    private convert(vehicleTaskDetails: VehicleTaskDetailsVma): VehicleTaskDetailsVma {
        const copy: VehicleTaskDetailsVma = Object.assign({}, vehicleTaskDetails);

        copy.startDateTime = this.dateUtils.toDate(vehicleTaskDetails.startDateTime);

        copy.endDateTime = this.dateUtils.toDate(vehicleTaskDetails.endDateTime);

        copy.createdDate = this.dateUtils.toDate(vehicleTaskDetails.createdDate);

        copy.lastModifiedDate = this.dateUtils.toDate(vehicleTaskDetails.lastModifiedDate);
        return copy;
    }
}
