import { Schema, model } from 'mongoose';

const parsedCategoriesSchema = new Schema({
    catId: String,
    parseResLength: Number
});

export default model('ParsedCategories', parsedCategoriesSchema);
