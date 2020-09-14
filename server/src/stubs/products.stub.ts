import * as _ from 'lodash';
import { cloneStub, generateImage, generateSocials }  from '../helpers/stub-helpers';



function getSlugObject(i: number = 0): any {
    return 'slug';
}

function getTitleObject(i: number = 0): any {
    return {
        
        en: `title en ${i}`,
        ge: `title ge ${i}`,
        ru: `title ru ${i}`,
    };
}
function getValuesObject(i: number = 0): any {
    const social = generateSocials();
    return [
          { account: social, link: `https://www.${social}.com/` },
          { account: social, link: `https://www.${social}.com/` },
          { account: social, link: `https://www.${social}.com/` }
    ];
}

function getFilterTypeObject(i: number = 0): any {
    return 'radio';
}

const ProductsStub = {
    slug: getSlugObject(),
    title: getTitleObject(),
    values: getValuesObject(),
    filterType: getFilterTypeObject(),
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(ProductsStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    slug: getSlugObject(i),
    title: getTitleObject(i),
    values: getValuesObject(i),
    filterType: getFilterTypeObject(i),
  }));
}
