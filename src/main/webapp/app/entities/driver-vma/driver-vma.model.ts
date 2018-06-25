import { BaseEntity } from './../../shared';

export const enum StatusType {
    'ENABLED',
    'DISABLED',
    'DELETED'
}

export class DriverVma implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public businessIdentification?: string,
        public phoneNumber?: string,
        public createdBy?: string,
        public createdDate?: any,
        public lastModifiedBy?: string,
        public lastModifiedDate?: any,
        public status?: StatusType,
    ) {
    }
}
