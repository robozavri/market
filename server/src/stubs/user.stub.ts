import * as _ from 'lodash';
import { cloneStub }  from '../helpers/stub-helpers';
import { roles, genders } from '../constants/user';

  // passwordHash: '$2a$10$CWAGAtwAv2xdjnR.pzicqOipZwshQOtplPDRnsJ4gezFJBNTa/tcm', // password
  // passwordHash: '$2a$10$E3Og5hO8l33mNilrlIsapOk9vn.ES3neSEOULRufY71hi8/bT6ZQi', // Abu56pq2GX8KLhb

const userStub = {
  email: 'me@gmail.com',
  firstName: 'First',
  lastName: 'Last',
  gender: genders.MALE,
  dateOfBirth: new Date(1990, 0, 1),
  passwordHash: '$2a$10$CWAGAtwAv2xdjnR.pzicqOipZwshQOtplPDRnsJ4gezFJBNTa/tcm',
  isActivated: false,
  activationToken: 'test-activation-token',
  role: roles.USER,
  joinedAt: new Date(2017, 0, 1),
  isBlocked: false,
  isDeactivated: false,
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(userStub, ['email']),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    email: `user_${i}@gmail.com`,
  }));
}