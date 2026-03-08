import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  product_name: String,
  description: String,
  category: String,
  sub_category: String,
  seo_tags: [String],
  sustainability_filters: [String],
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Product", productSchema);