import { Router, Request, Response, NextFunction } from 'express';
import * as filtersDao from './filters.dao';
import * as filtersParser  from './filters.parser';
import * as auth from '../../auth';
import * as _ from 'lodash';
import { slugify } from '../../helpers/text-helpers';
import { parseFilters } from '../../helpers/parse-helper';
const filtersRouter = Router();

filtersRouter.get('/', filtersParser.parseGetByQuery, getByQuery);
filtersRouter.get('/parser', parser);
filtersRouter.post('/', auth.isAdmin, filtersParser.parseCreate, create);
filtersRouter.put('/:id', auth.isAdmin, filtersParser.parseUpdate, update);
filtersRouter.delete('/:id', auth.isAdmin, destroy);

export default filtersRouter;

// =============== GET ===============
async function parser(req: Request, res: Response, next: NextFunction) {
  const delay = (ms: any) => new Promise(res => setTimeout(res, ms));
  // await delay(5000);

      try {

        // const result = await parseFilters('test');
        res.json( result );
      } catch (e) {
        next(e);
      }


}



async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const filtersData = await filtersDao.getByQuery(query);
    res.json(filtersData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await filtersDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await filtersDao.update(payload._id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await filtersDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}