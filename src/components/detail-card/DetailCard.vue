<template>
  <div class="detail-card">
    <div class="detail-img-wrapper">
      <img
        class="main-img"
        :src="product?.main_img ? product.main_img : ''"
        alt="Main product image"
      />
      <div class="detail-img-container">
        <div v-for="(image, index) in product.images" :key="index">
          <div>
            <img
              class="detail-img"
              :src="image ? image : ''"
              :alt="`Product image ${index}`"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="detail-content-wrapper">
      <h2>{{ product?.title ? product.title : "" }}</h2>
      <p>Price: ${{ product?.price ? product.price : "" }}</p>
      <button @click.stop="addToCart(product)">add to cart</button>
      <button @click="showModal = true">Check-Out</button>
    </div>
    <CheckoutModal
      :isVisible="showModal"
      :cartData="cart"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import { useCartStore } from "@/stores/products";
import { getCurrentInstance, ref, computed } from "vue";
import CheckoutModal from "../checkout-modal/CheckoutModal";
export default {
  name: "DetailCard",
  components: {
    CheckoutModal,
  },
  props: {
    product: Object,
  },
  setup() {
    const cartStore = useCartStore();
    const showModal = ref(false);
    const internalInstance = getCurrentInstance();
    const addToCart = async (productId) => {
      try {
        await cartStore.addToCart(productId);
        internalInstance.appContext.config.globalProperties.$toast.success(
          "Product added to cart successfully!",
          {
            timeout: 1000,
          }
        );
      } catch (error) {
        console.error("Error adding product to cart:", error);
        internalInstance.appContext.config.globalProperties.$toast.error(
          "Failed to add product to cart.",
          {
            timeout: 1000,
          }
        );
      }
    };
    const reactiveCart = computed(() => cartStore.cart);
    return {
      addToCart,
      showModal,
      cart: reactiveCart,
    };
  },
};
</script>

<style>
.detail-card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-width: 800px;
  margin: auto;
}

.main-img {
  width: 300px;
  border-radius: 8px;
}

.detail-img {
  width: 100px;
  height: 60px;
  margin-top: 10px;
  border: 1px solid black;
}

.detail-img-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.detail-img-wrapper {
  display: flex;
  flex-direction: column;
  padding-right: 20px;
}

.detail-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 12px;
}

h2 {
  margin: 0;
  color: #333;
  font-size: 24px;
}

p {
  margin: 0;
  color: #666;
  font-size: 18px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

button:nth-last-child(1) {
  background-color: #28a745;
}

button:nth-last-child(1):hover {
  background-color: #218838;
}
</style>
