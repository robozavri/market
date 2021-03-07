import { Router, Request, Response, NextFunction } from 'express';
import * as cityDao from './city.dao';
import * as cityParser  from './city.parser';
import * as auth from '../../auth';


const cityRouter = Router();

cityRouter.get('/', cityParser.parseGetByQuery, getByQuery);
cityRouter.post('/', auth.isAdmin, cityParser.parseCreate, create);
cityRouter.put('/:id', auth.isAdmin, cityParser.parseUpdate, update);
cityRouter.delete('/:id', auth.isAdmin, destroy);

export default cityRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const eventsData = await cityDao.getByQuery(query);
    res.json(eventsData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await cityDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const payload = req.body;
    await cityDao.update(id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await cityDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}