import { BaseEntity } from './../../shared';

export const enum VehicleTaskType {
    'JOURNEY',
    'MAINTENANCE'
}

export const enum StatusType {
    'ENABLED',
    'DISABLED',
    'DELETED'
}

export class VehicleTaskVma implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public type?: VehicleTaskType,
        public description?: string,
        public maxDrivers?: number,
        public startDateTime?: any,
        public endDateTime?: any,
        public createdBy?: string,
        public createdDate?: any,
        public lastModifiedBy?: string,
        public lastModifiedDate?: any,
        public status?: StatusType,
        public vehicle?: BaseEntity,
        public details?: BaseEntity[],
        public costs?: BaseEntity[],
        public drivers?: BaseEntity[],
    ) {
    }
}
