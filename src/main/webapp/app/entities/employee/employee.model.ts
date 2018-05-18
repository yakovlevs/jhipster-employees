import { BaseEntity } from './../../shared';

export const enum Gender {
    'MALE',
    'FEMALE'
}

export class Employee implements BaseEntity {
    constructor(
        public id?: number,
        public birthDate?: any,
        public firstName?: string,
        public lastName?: string,
        public gender?: Gender,
        public hireDate?: any,
        public salaries?: BaseEntity[],
    ) {
    }
}
