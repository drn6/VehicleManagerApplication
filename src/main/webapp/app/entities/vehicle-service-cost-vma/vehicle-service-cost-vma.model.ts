import { BaseEntity } from './../../shared';

export const enum VehicleServiceCostType {
    'SPECIAL',
    'REGULAR',
    'HOLIDAY'
}

export const enum StatusType {
    'ENABLED',
    'DISABLED',
    'DELETED'
}

export class VehicleServiceCostVma implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public type?: VehicleServiceCostType,
        public perDay?: number,
        public perKM?: number,
        public perDiver?: number,
        public createdBy?: string,
        public createdDate?: any,
        public lastModifiedBy?: string,
        public lastModifiedDate?: any,
        public status?: StatusType,
        public vehicle?: BaseEntity,
    ) {
    }
}
