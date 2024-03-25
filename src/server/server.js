const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Product = require("./productModel");
const Cart = require("./cartModel");

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://lashadodashvili:YNkUhr04zOYUl1nw@productsdb.aum3wjk.mongodb.net/?retryWrites=true&w=majority&appName=productsDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.post("/api/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

app.get("/api/products", async (req, res) => {
  const pageSize = 9;
  const page = parseInt(req.query.page) || 1;
  try {
    const products = await Product.find({})
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    const totalProducts = await Product.countDocuments({});
    res.status(200).send({
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / pageSize),
      },
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found.");
    }
    res.status(200).send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the product.");
  }
});

app.post("/api/cart", async (req, res) => {
  try {
    let cart = await Cart.findOne({ product: req.body._id });
    if (cart) {
      cart.quantity += 1;
      await cart.save();
    } else {
      cart = new Cart({
        product: req.body._id,
        quantity: 1,
      });
      await cart.save();
    }
    res.status(201).send(cart);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
app.get("/api/carts", async (req, res) => {
  try {
    const carts = await Cart.find({}).populate("product");

    res.status(200).send(carts);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.patch("/api/cart/:id", async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const cartId = req.params.id;
  const { change } = req.body;
  try {
    const cart = await Cart.findById(cartId);
    if (!cart) return res.status(404).send("Cart item not found.");

    cart.quantity += change;
    if (cart.quantity <= 0) {
      await Cart.findByIdAndDelete(cartId);
      return res
        .status(200)
        .send({ message: "Cart item deleted due to zero quantity." });
    } else {
      await cart.save();
      return res.status(200).send(cart);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

app.delete("/api/cart/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: "Cart item deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
