import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';

const FiltersSchema = new Schema({
  title: multilingualSchema,
  slug: String,
  values: [{ id: String, slug: String, ge: String, en: String, ru: String }],
  filterType: String,
  isPublic: Boolean,
  cat_id: String,
});

export default model('Filters', FiltersSchema);
