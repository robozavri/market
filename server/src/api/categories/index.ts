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
    // const parent_category = await Model.findOne({ '_id': parent_id }, { 'name': 1, 'slug': 1, 'ancestors': 1 }).exec();
    const parent_category = await categoriesDao.findOne({ '_id': parent_id }, { 'name': 1, 'slug': 1, 'ancestors': 1 });
      if ( parent_category ) {
         const { _id, name, slug } = parent_category;
         ancest = [...parent_category.ancestors];
         ancest.unshift({ _id, name, slug });
         console.log('ancestors:', ancest);
         const category = await categoriesDao.updateOne(id, { 'ancestors': ancest });
      }
    } catch (err) {
        console.log(err.message);
    }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const parent = req.body.parent ? req.body.parent : null;
    const result = await categoriesDao.create({name: req.body.name, parent});
    buildAncestors(result._id, parent);
    res.status(201).send({ category: result._id });
  } catch (e) {
    next(e);
  }
}


async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const payload = req.body;
    await categoriesDao.updateOne(id, { name:  payload.category_name, slug: slugify(payload.category_name)});
    await categoriesDao.update({'ancestors._id': id}, {'ancestors.$.name': payload.category_name, 'ancestors.$.slug': slugify(payload.category_name) });
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
    console.log('err', err);
    if (!err) {
      result = await categoriesDao.destroyAll({'ancestors._id': id});
      console.log('result', result);
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (e) {
    next(e);
  }
}
