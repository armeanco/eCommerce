import {model, models, Schema} from "mongoose";

const ProductSchema = new Schema({
  name: String,
  description: String,
  description_en: String,
  description_am: String,
  description_ru: String,
  picture: String,
  upicture: String,
  tpicture: String,
  category: String,
  price: Number,
  colors: Array,
  height: Array,
  width: Array,
  depth: Array,
});

const Products = models?.Products || model('Products', ProductSchema);

export default Products;