import { BaseEntity } from './../../shared';

export const enum CostType {
    'KM',
    'DRIVER',
    'FUEL',
    'INFRASTRUCTURES',
    'STRUCTURE',
    'MAINTENANCE'
}

export const enum StatusType {
    'ENABLED',
    'DISABLED',
    'DELETED'
}

export class CostVma implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public type?: CostType,
        public cost?: number,
        public createdBy?: string,
        public createdDate?: any,
        public lastModifiedBy?: string,
        public lastModifiedDate?: any,
        public status?: StatusType,
        public vehicleTask?: BaseEntity,
    ) {
    }
}
