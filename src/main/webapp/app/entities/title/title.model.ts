import { BaseEntity } from './../../shared';

export class Title implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public fromDate?: any,
        public toDate?: any,
        public employee?: BaseEntity,
    ) {
    }
}
