import logger from '../helpers/logger';
import config from '../config/environment';
import { roles } from '../constants/user';
import * as _ from 'lodash';

import * as UserDao from '../api/users/user.dao';
import * as CommonDao from '../api/commons/common.dao';
import * as MetaDao from '../api/metas/meta.dao';
import * as CityDao from '../api/cities/city.dao';

import * as UserStub from '../stubs/user.stub';
import * as CommonStub from '../stubs/common.stub';
import * as MetaStub from '../stubs/meta.stub';
import * as CityStub from '../stubs/city.stub';




export async function seedDB() {
  const { seedDB, env } = config;
  if (!seedDB) return;
  if (env === 'development') {
    await clearDBDevelopment();
    await seedDBDevelopment();
  }
  if (env === 'production') {
    await clearDBProduction();
    await seedDBProduction();
  }
}

export async function seedDBDevelopment() {
  await UserDao.insertMany(getAdmin());
  await UserDao.insertMany(UserStub.getMany(10));
  await MetaDao.create(MetaStub.getSingle());
  await CommonDao.create(CommonStub.getSingle());
  await CityDao.insertMany(CityStub.getMany());

  logger.info('Seed DB development completed');
}

export async function seedDBProduction() {
  await UserDao.insertMany(getAdmin());
  await UserDao.insertMany(UserStub.getMany(10));
  await MetaDao.create(MetaStub.getSingle());
  await CommonDao.create(CommonStub.getSingle());
  await CityDao.insertMany(CityStub.getMany());

  logger.info('Seed DB production completed');
}

export async function clearDBDevelopment() {
  await UserDao.destroyAll();
  await MetaDao.destroyAll();
  await CommonDao.destroyAll();

}

export async function clearDBProduction() {
  await UserDao.destroyAll();
  await MetaDao.destroyAll();
  await CommonDao.destroyAll();

}

function getAdmin() {
  return [
    UserStub.getSingle({
      email: 'admin@project.com',
      name: 'Admin',
      role: roles.ADMIN,
      isActivated: true,
    })
  ];
}