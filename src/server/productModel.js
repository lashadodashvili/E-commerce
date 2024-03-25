const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  main_img: String,
  images: [String],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
