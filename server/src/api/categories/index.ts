import { Router, Request, Response, NextFunction } from 'express';
import * as categoriesDao from './categories.dao';
import * as categoriesParser  from './categories.parser';
import * as auth from '../../auth';
import { slugify } from '../../helpers/text-helpers';
import * as _ from 'lodash';
// import axios from 'axios';
import Model from './categories.model';
import * as filtersDao from '../filters/filters.dao';


const categoriesRouter = Router();

categoriesRouter.get('/', categoriesParser.parseGetByQuery, getByQuery);
categoriesRouter.get('/descendants', getDescendents);
categoriesRouter.get('/parser', parser);
categoriesRouter.post('/', categoriesParser.parseCreate, create);
categoriesRouter.put('/:id', categoriesParser.parseUpdate, update);
categoriesRouter.delete('/:id', destroy);

export default categoriesRouter;

// =============== GET ===============

async function parser(req: Request, res: Response, next: NextFunction) {
  try {

    // const all = await  Model.find({}).lean();
    // const all = await  Model.find({}).lean().skip(0).limit(1000);
    // res.json(all);
    // return;


    // set filters to categories
  // const all = await Model.find({}).lean().or([{}]).skip(0).limit(1000);
  // _.forEach(all, async function (item: any, key) {
  //     const result = await filtersDao.getByQuery({ find: { cat_id:  item.cat_id  }, limit: 1000});
  //     if (result.items.length > 0) {
  //       const idies = _.map(result.items, '_id');
  //       // console.log('result', result.items);
  //       // console.log('result', idies);
  //       // console.log('item._id,', item._id);
  //       await categoriesDao.updateOne(item._id, { filters: idies });
  //     }
  // });

  // res.json(all);

  // await categoriesDao.update({}, { descendents: []});
  res.json('ok');
  // res.json('ok');
  return;
  // const all = await categoriesDao.find({});
  // const all = await  Model.find({}).lean().skip(0).limit(1);
  // res.json(all);
  // return;
  let arr = [];
  // console.log('all?: ', all.length)
  await all.map(async (obj: any) => {

      let descendents = [];
      const subIds = obj.sub_cats_ids.split(',');
      // arr.unshift(subIds);
      const cats: any = await categoriesDao.find({ cat_id: {$in : subIds} }, { '_id': 1, 'title': 1, 'slug': 1, 'descendents': 1 });
      // console.log('subIds : ', subIds.length );
      // console.log('subIds : ', subIds );
      // console.log('cats : ', cats.length );
      // console.log('*************** : ' );
      // console.log( cats );
      // console.log( obj._id );
      await cats.map(async(cat: any) => {
        // console.log( 'cat.descendents', cat.descendents );
        const { _id, title, slug } = cat;
        // descendents = [{ _id, title, slug }];
        // descendents = [ ...cat.descendents ];
        descendents.unshift({ _id, title, slug });
        // descendents = [{ _id, slug }, ...cat.descendents];
        // descendents = [{ _id, title, slug }, ...cat.descendents];
        console.log( 'descendents', descendents );
        console.log('---------------------' );
        // 
        // descendents.push({ _id, title, slug });
        await categoriesDao.updateOne(obj._id, { descendents: descendents});
        descendents = [];
      });
      // arr.unshift(cats);
      /*
      await subIds.map(async(id: any) => {
        // arr.unshift({id: id, obj:  obj._id});
        const cat: any = await categoriesDao.findOne({ cat_id: id }, { '_id': 1, 'title': 1, 'slug': 1, 'descendents': 1 });
        // arr.unshift({id: id, obj:  obj._id});
        // arr.unshift({id: id, obj:  obj._id});

        if (cat) {
          const { _id, title, slug } = cat;
          descendents = [...cat.descendents];
          // descendents.unshift({ _id, slug });
          // descendents.unshift({ _id, title, slug });
          descendents.push({ _id, title, slug });
          // arr.unshift( { id: obj._id, descendents: descendents });
          // console.log('update:', { id: obj._id, descendents: descendents });
          // arr.push( { id: obj._id, descendents: descendents });
          // console.log('update:', { id: obj._id, descendents: descendents });
          await categoriesDao.updateOne(obj._id, { descendents: descendents});
        } else {
          console.log( { cat_id: id });
          console.log( obj._id);
        }
      });
      */
  });
  // console.log( arr );
  res.json(arr);

} catch (err) {
  console.log(err.message);
}
return;
  /*
   const all = await categoriesDao.find({});

  all.map(async (obj: any) => {
      if (obj.parent_cat_id === '0') {
        return;
      }
      let cat = await categoriesDao.findOne({ cat_id: obj.parent_cat_id });
      await categoriesDao.updateOne(obj._id, { parent: cat._id});
  });

  res.json(all);
  return;
  */
  // console.log('here 1');
/*
  // console.log('here 1'); return;
    const dataKA = await axios.get('https://www.mymarket.ge/ka/search/getproducts')
    .then((response: any) => {
      // console.log(response.data);
        return response.data;
    }).catch((error: any) => {
        console.log(error.error);
        return error.error;
    });
    const dataEN = await axios.get('https://www.mymarket.ge/en/search/getproducts')
    .then((response: any) => {
      // console.log(response.data);
        return response.data;
    }).catch((error: any) => {
        console.log(error.error);
        return error.error;
    });
    const dataRU = await axios.get('https://www.mymarket.ge/ru/search/getproducts')
    .then((response: any) => {
      // console.log(response.data);
        return response.data;
    }).catch((error: any) => {
        console.log(error.error);
        return error.error;
    });
    const result: any[] = [];

    const categoriesKA: any[] = [];
    const categoriesEN: any[] = [];
    const categoriesRU: any[] = [];

    // Object.keys(dataKA.Data.Categories).map((key, index) => {
    //   categoriesKA.push(dataKA.Data.Categories[key]);
    // });

    Object.keys(dataEN.Data.Categories).map((key, index) => {
      categoriesEN.push(dataEN.Data.Categories[key]);
    });

    Object.keys(dataRU.Data.Categories).map((key, index) => {
      categoriesRU.push(dataRU.Data.Categories[key]);
    });

    // console.log('categoriesEN 3 title', categoriesEN );
    // console.log('categoriesEN 3 title', _.find(categoriesEN, {cat_id: '3' }) );

    Object.keys(dataKA.Data.Categories).map((key, index) => {
      // console.log('category:', dataKA.Data.Categories[key]);
      // if (dataKA.Data.Categories[key].parent_cat_id === '0') {
      //   return;
      // }
      let catEN = _.find(categoriesEN, { cat_id: dataKA.Data.Categories[key].cat_id });
      let catRU = _.find(categoriesRU, { cat_id: dataKA.Data.Categories[key].cat_id });
      // console.log('catEN', catEN)
      result.push({
        slug: slugify(catEN?.title),
        name: catEN?.title,
        title: {
          ge: dataKA.Data.Categories[key]?.title,
          en: catEN?.title,
          ru: catRU?.title,
        },
        catId: index + 1,
        cat_id: dataKA.Data.Categories[key].cat_id,
        parent_cat_id: dataKA.Data.Categories[key].parent_cat_id,
        sub_cats_ids: dataKA.Data.Categories[key].sub_cats_ids,
      });
      // console.log('dataKA.Data.Categories[key].title',_.find(dataEN.Data.Categories, {'cat_id': dataKA.Data.Categories[key].cat_id }) );
      categoriesDao.create({
        slug: slugify(catEN?.title),
        name: catEN?.title,
        title: {
          ge: dataKA.Data.Categories[key]?.title,
          en: catEN?.title,
          ru: catRU?.title,
        },
        catId: index + 1,
        cat_id: dataKA.Data.Categories[key].cat_id,
        parent_cat_id: dataKA.Data.Categories[key].parent_cat_id,
        sub_cats_ids: dataKA.Data.Categories[key].sub_cats_ids,
      });
    });
      // res.json(categoriesEN);
    res.json(result);
    // res.json(data.Data.Categories);
*/
  
   
}


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
    const parent_category: any = await categoriesDao.findOne({ '_id': parent_id }, { 'title': 1, 'slug': 1, 'ancestors': 1 });
      if ( parent_category ) {
         const { _id, title, slug }: any = parent_category;
         ancest = [...parent_category.ancestors];
         ancest.unshift({ _id, title, slug });
         const category = await categoriesDao.updateOne(id, { 'ancestors': ancest });
      }
    } catch (err) {
        console.log(err.message);
    }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    // catId ში უნდა ჩაეწეროს ბოლოს
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
    payload.parent = payload.parent === '' || payload.parent === null ? undefined : payload.parent;
    await categoriesDao.updateOne(id, { parent: payload.parent, name: payload.name, slug: slugify(payload.name), title: payload.title});
    if ( payload.parent !== undefined ) buildAncestors(id, payload.parent);
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
