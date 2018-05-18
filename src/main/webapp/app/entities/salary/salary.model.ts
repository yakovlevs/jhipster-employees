import { BaseEntity } from './../../shared';

export class Salary implements BaseEntity {
    constructor(
        public id?: number,
        public salary?: number,
        public fromDate?: any,
        public toDate?: any,
        public employee?: BaseEntity,
    ) {
    }
}
