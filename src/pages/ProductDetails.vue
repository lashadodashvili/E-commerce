<template>
  <div>
    <h1>Product Details</h1>
    <DetailCard v-if="!isLoading && productDetails" :product="productDetails" />
    <p v-if="isLoading" class="loader"></p>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useProductsStore, useCartStore } from "@/stores/products";
import DetailCard from "@/components/detail-card/DetailCard.vue";
import { watch, computed, onMounted } from "vue";

export default {
  name: "ProductDetails",
  components: { DetailCard },
  setup() {
    const route = useRoute();
    const productsStore = useProductsStore();
    const cartStore = useCartStore();

    watch(
      () => route.params.productId,
      (newProductId) => {
        productsStore.fetchProductDetails(newProductId);
      },
      { immediate: true }
    );
    onMounted(() => {
      cartStore.fetchCart();
    });
    const productDetails = computed(() => productsStore.productDetails);
    const isLoading = computed(() => productsStore.isLoading);
    return {
      productDetails,
      addToCart: (product) => cartStore.addToCart(product._id),
      isLoading,
    };
  },
};
</script>

<style>
/* Add styles for your ProductDetails component here */
</style>
