import { Router, Request, Response, NextFunction } from 'express';
import * as productsDao from './products.dao';
import * as productsParser  from './products.parser';
import * as auth from '../../auth';


const productsRouter = Router();

productsRouter.get('/', productsParser.parseGetByQuery, getByQuery);
productsRouter.post('/', auth.isSigned, productsParser.parseCreate, create);
productsRouter.put('/:id', auth.isAdmin, productsParser.parseUpdate, update);
productsRouter.delete('/:id', auth.isAdmin, destroy);
productsRouter.patch('/positions', productsParser.parseUpdatePositions, updatePositions);

export default productsRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const productsData = await productsDao.getByQuery(query);
    res.json(productsData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    const { _id } = req.user;
    payload.userId = _id;
    // console.log({_id});
    // console.log({payload});
    await productsDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await productsDao.update(payload._id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function updatePositions(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await payload.items.map((item: any) => {
      productsDao.update(item._id, { position: item.position });
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await productsDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}