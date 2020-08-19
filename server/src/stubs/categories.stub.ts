import * as _ from 'lodash';
import { cloneStub }  from '../helpers/stub-helpers';

const CategoriesStub = {
  title: 'title',
  createdAt: Date(),
  thumbnail: {url : ''},
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(CategoriesStub),
    ...fields
  };
}

const categories = [
  'abstract', 'animals', 'business', 'cats', 'city', 'food', 'nightlife', 'fashion', 'people', 'nature', 'sports', 'technics', 'transport'
];

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    title: `title_${i}`,
    title: {
      en: `category title_${i} en`,
      ge: `category title_${i} ge`,
      ru: `category title_${i} ru`
  },
  description: {
      en: `category description_${i} en`,
      ge: `category description_${i} ge`,
      ru: `category description_${i} ru`
  },
  meta: {
    title: {
      en: `category title_${i} en`,
      ge: `category title_${i} ge`,
      ru: `category title_${i} ru`
    },
    description: {
      en: `category description_${i} en`,
      ge: `category description_${i} ge`,
      ru: `category description_${i} ru`
    },
    keywords: ['test','test2'],
    image: { url: `http://lorempixel.com/${categories[Math.floor(Math.random() * categories.length)]}/800/${_.random(5, 6)}00/`},
  }
  }));
}
