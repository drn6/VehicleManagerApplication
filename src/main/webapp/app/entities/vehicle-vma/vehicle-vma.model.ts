import { BaseEntity } from './../../shared';

export const enum StatusType {
    'ENABLED',
    'DISABLED',
    'DELETED'
}

export class VehicleVma implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public numberPlate?: string,
        public numberOfPlace?: number,
        public createdBy?: string,
        public createdDate?: any,
        public lastModifiedBy?: string,
        public lastModifiedDate?: any,
        public status?: StatusType,
        public costs?: BaseEntity[],
        public tasks?: BaseEntity[],
    ) {
    }
}
