import { Router, Request, Response, NextFunction } from 'express';
import * as categoriesDao from './categories.dao';
import * as categoriesParser  from './categories.parser';
import * as auth from '../../auth';
import Model from './categories.model';
import { slugify } from '../../helpers/text-helpers';

const categoriesRouter = Router();

categoriesRouter.get('/', categoriesParser.parseGetByQuery, getByQuery);
categoriesRouter.get('/descendants', getDescendents);
categoriesRouter.post('/', categoriesParser.parseCreate, create);
categoriesRouter.put('/:id', categoriesParser.parseUpdate, update);
categoriesRouter.delete('/:id', destroy);

export default categoriesRouter;

// =============== GET ===============

async function getDescendents(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await categoriesDao.find({ 'ancestors._id':   req.query.category_id }, { '_id': false, 'name': true });
   res.status(201).send({result});
   } catch (err) {
     res.status(500).send(err);
   }
}

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const categoriesData = await categoriesDao.getByQuery(query);
    res.json(categoriesData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function buildAncestors(id: any, parent_id: any) {
  let ancest = [];
  try {
    const parent_category: any = await categoriesDao.findOne({ '_id': parent_id }, { 'name': 1, 'slug': 1, 'ancestors': 1 });
      if ( parent_category ) {
         const { _id, name, slug }: any = parent_category;
         ancest = [...parent_category.ancestors];
         ancest.unshift({ _id, name, slug });
         const category = await categoriesDao.updateOne(id, { 'ancestors': ancest });
      }
    } catch (err) {
        console.log(err.message);
    }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    const result = await categoriesDao.create(payload);
    if (payload.parent !== null) buildAncestors(result._id, payload.parent);
    res.status(201).send({ category: result._id });
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const payload = req.body;
    await categoriesDao.updateOne(id, { parent: payload.parent, name: payload.name, slug: slugify(payload.name), title: payload.title});
    if (payload.parent !== null) buildAncestors(id, payload.parent);
    // await categoriesDao.update({'ancestors._id': id}, {'ancestors.$.name': payload.name, 'ancestors.$.slug': slugify(payload.name) });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    let result;
    const { id } = req.params;
    const err = await categoriesDao.destroy(id);
    if (err) {
      result = await categoriesDao.destroyAll({'ancestors._id': id});
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (e) {
    next(e);
  }
}
