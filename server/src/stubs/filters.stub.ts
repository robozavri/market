import * as _ from 'lodash';
import { cloneStub }  from '../helpers/stub-helpers';



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
    return [
          {
            title: {
              en: `title en ${i}`,
              ge: `title ge ${i}`,
              ru: `title ru ${i}`,
          },
          slug: `slug ${i}`
        },
          {
            title: {
              en: `title en ${i}`,
              ge: `title ge ${i}`,
              ru: `title ru ${i}`,
          },
          slug: `slug ${i}`
        },
          {
            title: {
              en: `title en ${i}`,
              ge: `title ge ${i}`,
              ru: `title ru ${i}`,
          },
          slug: `slug ${i}`
        },
    ];
}

function getFilterTypeObject(i: number = 0): any {
    return 'radio';
}

function getIsPublicObject(i: number = 0): any {
    return false;
}

const FiltersStub = {
    title: getTitleObject(),
    values: getValuesObject(),
    filterType: getFilterTypeObject(),
    isPublic: getIsPublicObject(),
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(FiltersStub),
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
    isPublic: getIsPublicObject(i),
  }));
}
