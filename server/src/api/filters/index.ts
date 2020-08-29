import { Router, Request, Response, NextFunction } from 'express';
import * as filtersDao from './filters.dao';
import * as filtersParser  from './filters.parser';
import * as auth from '../../auth';


const filtersRouter = Router();

filtersRouter.get('/', filtersParser.parseGetByQuery, getByQuery);
filtersRouter.post('/', auth.isAdmin, filtersParser.parseCreate, create);
filtersRouter.put('/:id', auth.isAdmin, filtersParser.parseUpdate, update);
filtersRouter.delete('/:id', auth.isAdmin, destroy);

export default filtersRouter;

// =============== GET ===============

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