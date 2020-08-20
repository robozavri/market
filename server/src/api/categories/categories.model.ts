import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';
import metaTagsSchema from '../../schemas/metaTags.schema';
import imageSchema from '../../schemas/image.schema';
// import { slugify } from '../../helpers/text-helpers';

const CategoriesSchema = new Schema({
  name: String,
  title: multilingualSchema,
  slug: { type: String, index: true },
  parent: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: 'Categories'
  },
  ancestors: [{
      _id: {
          type: Schema.Types.ObjectId,
          ref: 'Categories',
          index: true
  },
      name: String,
      slug: String
  }],
  meta: metaTagsSchema,
  position: Number,
});

// CategoriesSchema.pre('save', async function (next) {
//   this.slug = slugify(this.name);
//   next();
// });

export default model('Categories', CategoriesSchema);


