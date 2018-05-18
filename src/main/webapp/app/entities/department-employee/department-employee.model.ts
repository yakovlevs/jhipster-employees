import { BaseEntity } from './../../shared';

export class DepartmentEmployee implements BaseEntity {
    constructor(
        public id?: number,
        public fromDate?: any,
        public toDate?: any,
        public employee?: BaseEntity,
        public department?: BaseEntity,
    ) {
    }
}
