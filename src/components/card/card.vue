<template>
  <div
    class="card"
    v-for="product in products"
    :key="product._id"
    @click="openProductDetails(product._id)"
  >
    <div class="img-container"><img class="img" :src="product.main_img" /></div>
    <div class="content-wrapper">
      <div>
        <p class="title">{{ product?.title ? product.title : "" }}</p>
        <p class="price">{{ product?.price ? product.price : "" }}$</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductsStore } from "../../stores/products";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Card",
  setup() {
    const productsStore = useProductsStore();

    return {
      products: productsStore.products,
    };
  },
  methods: {
    openProductDetails(productId) {
      if (productId) {
        this.$router.push({
          name: "ProductDetails",
          params: { productId: productId },
        });
      }
    },
  },
};
</script>

<style>
.card {
  display: flex;
  border: 1px solid black;
  border-radius: 12px;
  column-gap: 12px;
  cursor: pointer;
}
.img-container {
  display: flex;
}
.img {
  width: 100px;
  height: 80px;
  background-size: cover;
  background-repeat: no-repeat;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}
.content-wrapper {
  display: flex;
  flex-direction: column;
  padding: 8px;
}
.title {
  font-size: 24px;
  font-weight: 700;
}
</style>
