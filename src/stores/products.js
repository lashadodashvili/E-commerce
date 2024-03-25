import { defineStore } from "pinia";
import axios from "axios";
export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
    isLoading: false,
    productDetails: null,
    pagination: null,
  }),
  actions: {
    async fetchProducts(page = 1) {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products?page=${page}`
        );

        this.products = response.data.products;
        this.pagination = response.data.pagination;
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchProductDetails(productId) {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products/${productId}`
        );
        this.productDetails = response.data;
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [],
    isLoading: false,
  }),
  getters: {},
  actions: {
    async fetchCart() {
      this.isLoading = true;
      try {
        const response = await axios.get("http://localhost:3000/api/carts");
        this.cart = response.data;
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        this.isLoading = false;
      }
    },
    async updateCartItemQuantity(itemId, quantityChange) {
      const existingItemIndex = this.cart.findIndex(
        (item) => item._id === itemId
      );
      if (existingItemIndex !== -1) {
        const newQuantity =
          this.cart[existingItemIndex].quantity + quantityChange;
        if (newQuantity > 0) {
          try {
            await axios.patch(`http://localhost:3000/api/cart/${itemId}`, {
              change: quantityChange,
            });
            await this.fetchCart();
          } catch (error) {
            console.error("Failed to update cart item:", error);
            throw new Error("Failed to update cart item.");
          }
        }
      }
    },
    async deleteCartItem(itemId) {
      const existingItemIndex = this.cart.findIndex(
        (item) => item._id === itemId
      );
      if (existingItemIndex !== -1) {
        try {
          await axios.delete(`http://localhost:3000/api/cart/${itemId}`);
          this.cart.splice(existingItemIndex, 1);
        } catch (error) {
          // Handle error (e.g., showing error message)
          console.error("Failed to delete cart item:", error);
          throw new Error("Failed to delete cart item.");
        }
      }
    },
    async increaseQuantity(item) {
      try {
        await this.useCartStore.updateCartItemQuantity(item._id, 1);
        // Optionally, show some feedback to the user that the operation was successful
      } catch (error) {
        // Handle the error, e.g., show a notification to the user
        alert(error.message);
      }
    },
    async addToCart(productId) {
      // Modify this to use productId
      try {
        await axios.post("http://localhost:3000/api/cart", {
          _id: productId,
        });
        // After adding to cart, fetch the cart again or update the state directly here
        this.fetchCart(); // Assuming you have a method to refresh cart items
        // Optionally, use this.$toast or equivalent for success message
      } catch (error) {
        console.error("Error adding product to cart:", error);
        // Optionally, use this.$toast or equivalent for error message
      }
    },
  },
});
