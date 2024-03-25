<template>
  <div>
    <h2>Add Product</h2>
    <form @submit.prevent="submitForm">
      <input v-model="product.title" type="text" placeholder="Title" required />
      <input
        v-model.number="product.price"
        type="number"
        placeholder="Price"
        required
      />
      <input
        v-model="product.main_img"
        type="text"
        placeholder="Main Image URL"
        required
      />

      <!-- Additional Images -->
      <input
        v-model="product.images[0]"
        type="text"
        placeholder="Additional Image URL 1"
      />
      <input
        v-model="product.images[1]"
        type="text"
        placeholder="Additional Image URL 2"
      />
      <input
        v-model="product.images[2]"
        type="text"
        placeholder="Additional Image URL 3"
      />

      <button type="submit">Add Product</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      product: {
        title: "",
        price: 0,
        main_img: "",
        images: ["", "", ""],
      },
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/products",
          this.product
        );
        console.log(response.data);
        this.$toast.success("Product added  successfully!", {
          timeout: 2000,
        });
        this.product = {
          title: "",

          price: 0,
          main_img: "",
          images: ["", "", ""],
        };
      } catch (error) {
        this.$toast.error("Failed to add product ", {
          timeout: 2000,
        });
      }
    },
  },
};
</script>
