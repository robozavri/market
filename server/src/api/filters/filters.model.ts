import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';

const FiltersSchema = new Schema({
  title: multilingualSchema,
  values: [{ slug: String, title: multilingualSchema }],
  filterType: String,
  isPublic: Boolean
});

export default model('Filters', FiltersSchema);
