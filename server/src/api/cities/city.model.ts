import { number, string } from 'joi';
import { Schema, model } from 'mongoose';
import multilingualSchema from '../../schemas/multilingual.schema';

const CitySchema = new Schema({
  id: String,
  title: multilingualSchema,
});

export default model('City', CitySchema);