import axios from 'axios';
const cheerio = require('cheerio');
import * as _ from 'lodash';
import { slugify } from '../helpers/text-helpers';

export async function parseFilters(url: any) {

    const dataKA = await axios.get('https://www.mymarket.ge/ka/search/53/iyideba-Laptop-kompiuterebi/?CatID=53')
    .then((response: any) => {
        return response.data;
    }).catch((error: any) => {
        console.log(error.error);
        return error.error;
    });

    const dataEN = await axios.get('https://www.mymarket.ge/en/search/53/iyideba-Laptop-kompiuterebi/?CatID=53')
    .then((response: any) => {
        return response.data;
    }).catch((error: any) => {
        console.log(error.error);
        return error.error;
    });
    const dataRU = await axios.get('https://www.mymarket.ge/ru/search/53/iyideba-Laptop-kompiuterebi/?CatID=53')
    .then((response: any) => {
        return response.data;
    }).catch((error: any) => {
        console.log(error.error);
        return error.error;
    });

    const $G = cheerio.load(dataKA);
    const $E = cheerio.load(dataEN);
    const $R = cheerio.load(dataRU);

    const itemsGE: any = await parseData($G, 'ge');
    const itemsEN: any = await parseData($E, 'en');
    const itemsRU: any = await parseData($R, 'ru');

    const mergedObjs: any[] = [];
    _.forEach(itemsGE, function (value, key) {
        const founded2 = _.find(itemsEN, { id: value.id });
        const founded3 = _.find(itemsRU, { id: value.id });

        mergedObjs.push({
            title: _.merge(value.title, founded2.title, founded3.title),
            values: recusriveMerge(value.values, founded2.values, founded3.values),
            slug: _.camelCase(founded2.title.en),
            filterType: value.filterType,
            isPublic: true
        });
    });
    return mergedObjs;
}

async function parseData($data: any, langCode: string) {

    const temporaryData: any[] = [];

    $data('.attrs-filter .filter-block').each(function() {
      let attributeId;
      const item3: any = {
        'title': {},
        'values': [],
        'slug': '',
        'filterType': 'checkbox',
        'isPublic': true
      };
      const temporaryArray: any[] = [];

      if ($data(this).attr('data-attr-id') === undefined ) {
        attributeId = $data(this).attr('data-name');
      } else {
        attributeId = $data(this).attr('data-attr-id');
      }
          item3.title[langCode] = $data(this).find('.attr_title').text();

          item3.filterType = $data(this).find('.input-wrapper').children().first().attr('class');
          $data(this).find('.input-wrapper').children().each(function() {
            const tempObj: any = {};
            tempObj.id =  $data(this).find('input').val(),
            tempObj[langCode] =  $data(this).find('label').text().replace('Capacitors type', '');
            temporaryArray.push(tempObj);
          });

        item3.values = temporaryArray;
        temporaryData.push({ id: attributeId, ...item3});
    });
    return temporaryData;
  }

  function recusriveMerge(arr1: any, arr2: any, arr3: any) {
    const tempArr: any = [];
    _.forEach(arr1, function (value, key) {
      const founded2 = _.find(arr2, { id: value.id });
      const founded3 = _.find(arr3, { id: value.id });
      tempArr.push({
        ...value,
        ...founded2,
        ...founded3
      });
    });
    return tempArr;
  }