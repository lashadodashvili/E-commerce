<template>
  <div class="products">
    <h1>Products</h1>
    <div v-if="isLoading" class="loader"></div>
    <div v-else class="card-list">
      <Card />
    </div>
    <div class="page-navigation">
      <button @click="goToPrevPage" :disabled="!canGoPrev">Prev</button>
      <button @click="goToNextPage" :disabled="!canGoNext">Next</button>
    </div>
  </div>
</template>

<script>
import { useProductsStore } from "../stores/products";
import { computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Card from "../components/card/card.vue";

export default {
  name: "ProductsPage",
  components: {
    Card,
  },
  setup() {
    const productsStore = useProductsStore();
    const router = useRouter();
    const route = useRoute();
    const currentPage = computed(() => parseInt(route.query.page) || 1);

    const goToPage = (page) => {
      router.push({ query: { page } }).catch(console.error);
      productsStore.fetchProducts(page);
    };

    onMounted(() => {
      goToPage(currentPage.value);
    });

    watch(
      () => route.query.page,
      () => {
        goToPage(currentPage.value);
      }
    );

    return {
      products: productsStore.products,
      isLoading: computed(() => productsStore.isLoading),
      goToNextPage: () => goToPage(currentPage.value + 1),
      goToPrevPage: () => goToPage(currentPage.value - 1),
      canGoNext: computed(
        () => currentPage.value < productsStore.pagination.totalPages
      ),
      canGoPrev: computed(() => currentPage.value > 1),
    };
  },
};
</script>

<style>
.products h1 {
  color: #42b983;
}
.card-list {
  padding: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
.page-navigation {
  padding: 50px;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
}
.product {
  position: relative;
  min-height: 100vh;
}
.loader {
  position: absolute;
  left: 50%;
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 6px solid #3498db;
  width: 40px;
  height: 40px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
