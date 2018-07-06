import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SERVER_API_URL} from '../../app.constants';

import {JhiDateUtils} from 'ng-jhipster';

import {VehicleTaskVma} from './vehicle-task-vma.model';
import {createRequestOption} from '../../shared';

export type EntityResponseType = HttpResponse<VehicleTaskVma>;

@Injectable()
export class VehicleTaskVmaService {

    private resourceUrl = SERVER_API_URL + 'api/vehicle-tasks';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) {
    }

    create(vehicleTask: VehicleTaskVma): Observable<EntityResponseType> {
        const copy = this.convert(vehicleTask);
        return this.http.post<VehicleTaskVma>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(vehicleTask: VehicleTaskVma): Observable<EntityResponseType> {
        const copy = this.convert(vehicleTask);
        return this.http.put<VehicleTaskVma>(this.resourceUrl, copy, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    addOrRemoveDriver(taskId, driverId, remove: boolean) {
        const action = (remove) ? 'removeDriver' : 'addDriver';
        const url = `${this.resourceUrl}/${taskId}/${action}/${driverId}`;
        return this.http.put<VehicleTaskVma>(url, null, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VehicleTaskVma>(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    dashboard(startDateTime?: Date, endDateTime?: Date): Observable<any> {
        let options: HttpParams = new HttpParams();
        // Begin assigning parameters
        if (!startDateTime || !endDateTime) {
            const date = new Date();
            startDateTime = new Date(date.getFullYear(), date.getMonth(), 1);
            endDateTime = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        }
        options = options.append('startDateTime', startDateTime.toISOString());
        options = options.append('endDateTime', endDateTime.toISOString());
        return this.http.get<any>(`${this.resourceUrl}/dashboard`, {params: options, observe: 'response'});
    }

    sendAlerts(id: number): Observable<any> {
        let options: HttpParams = new HttpParams();
        return this.http.get<any>(`${this.resourceUrl}/sendAlerts/${id}`, {params: options, observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<VehicleTaskVma[]>> {
        const options = createRequestOption(req);
        return this.http.get<VehicleTaskVma[]>(this.resourceUrl, {params: options, observe: 'response'})
            .map((res: HttpResponse<VehicleTaskVma[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VehicleTaskVma = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VehicleTaskVma[]>): HttpResponse<VehicleTaskVma[]> {
        const jsonResponse: VehicleTaskVma[] = res.body;
        const body: VehicleTaskVma[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VehicleTaskVma.
     */
    private convertItemFromServer(vehicleTask: VehicleTaskVma): VehicleTaskVma {
        const copy: VehicleTaskVma = Object.assign({}, vehicleTask);
        copy.startDateTime = this.dateUtils
            .convertDateTimeFromServer(vehicleTask.startDateTime);
        copy.endDateTime = this.dateUtils
            .convertDateTimeFromServer(vehicleTask.endDateTime);
        copy.createdDate = this.dateUtils
            .convertDateTimeFromServer(vehicleTask.createdDate);
        copy.lastModifiedDate = this.dateUtils
            .convertDateTimeFromServer(vehicleTask.lastModifiedDate);
        return copy;
    }

    /**
     * Convert a VehicleTaskVma to a JSON which can be sent to the server.
     */
    private convert(vehicleTask: VehicleTaskVma): VehicleTaskVma {
        const copy: VehicleTaskVma = Object.assign({}, vehicleTask);

        copy.startDateTime = this.dateUtils.toDate(vehicleTask.startDateTime);

        copy.endDateTime = this.dateUtils.toDate(vehicleTask.endDateTime);

        copy.createdDate = this.dateUtils.toDate(vehicleTask.createdDate);

        copy.lastModifiedDate = this.dateUtils.toDate(vehicleTask.lastModifiedDate);
        return copy;
    }
}
