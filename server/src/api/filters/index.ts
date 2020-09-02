import { Router, Request, Response, NextFunction } from 'express';
import * as filtersDao from './filters.dao';
import * as categoryDao from '../categories/categories.dao';
import * as filtersParser  from './filters.parser';
import * as auth from '../../auth';
import * as _ from 'lodash';
import { slugify } from '../../helpers/text-helpers';
import { parseFilters } from '../../helpers/parse-helper';
import Model from './ParsedCategories.model';

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
  // const parsedCatlist = await Model.find({}).lean();
  // _.forEach(parsedCatlist, async function (item: any, key) {
  //   await categoryDao.update({cat_id: item.catId }, {parsed: true});
  // });
  // console.log('categories update done');
  // res.json( 'ok' );
  // return;
  const categories: any = await categoryDao.getByQuery({find: {parsed: { $ne: true }}, limit: 1000});
  res.json(categories);
  return;
  res.json( 'started' );
      try {
        // const categories: any = await categoryDao.getByQuery({limit: 1000});
        const categories: any = await categoryDao.getByQuery({find: {parsed: { $ne: true }}, limit: 1000});
        categories.items.forEach((category: any, i: any) => {
          setDelay(category, i);
        });
        function setDelay(category: any, i: any) {
          setTimeout(async function() {
            // console.log(category.title.en + ' id: ' + category._id);
            console.log('started: ', category.cat_id);
            const parseRes = await parseFilters(category.cat_id);
            Model.create({catId: category.cat_id, parseResLength: parseRes.length});
            if (parseRes.length === 0) {
              console.log('has no filters. done: ', category.cat_id);
              return;
            }
            // console.log('cat_id', category.cat_id);
            // console.log('parseRes', parseRes);
            _.forEach(parseRes, async function (item, key) {
                item.cat_id = category.cat_id;
                await filtersDao.create(item);
            });
            console.log('done: ', category.cat_id);
          },  i * 5000);
        }
        // console.log('categories', categories);
        // res.json(categories);
        // const result = await parseFilters('test');
        // res.json( result );
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