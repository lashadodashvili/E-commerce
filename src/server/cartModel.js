const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  // Add other relevant fields such as user, price, etc.
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
