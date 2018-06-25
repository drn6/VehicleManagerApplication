import { BaseEntity } from './../../shared';

export const enum StatusType {
    'ENABLED',
    'DISABLED',
    'DELETED'
}

export class VehicleTaskDetailsVma implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public startDateTime?: any,
        public endDateTime?: any,
        public createdBy?: string,
        public createdDate?: any,
        public lastModifiedBy?: string,
        public lastModifiedDate?: any,
        public status?: StatusType,
        public vehicleTask?: BaseEntity,
    ) {
    }
}
