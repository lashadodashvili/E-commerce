<template>
  <div class="cart-container">
    <h1>Cart Page</h1>
    <div class="cart-list">
      <CartItem :cart="cart" @updateCart="fetchCart" />
    </div>
  </div>
  <div class="checkout-modal">
    <button @click="showModal = true">Check-Out</button>
    <CheckoutModal
      :isVisible="showModal"
      :cartData="cart"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import CartItem from "../components/cart-item/CartItem.vue";
import CheckoutModal from "@/components/checkout-modal/CheckoutModal.vue";
import { computed, ref } from "vue";
import { useCartStore } from "../stores/products";
export default {
  name: "CartList",
  emits: ["updateCart"],
  components: {
    CartItem,
    CheckoutModal,
  },
  setup() {
    const cartStore = useCartStore();
    const showModal = ref(false);
    const reactiveCart = computed(() => cartStore.cart);
    const fetchCart = () => {
      cartStore.fetchCart();
    };
    return {
      cart: reactiveCart,
      showModal,
      fetchCart,
    };
  },
};
</script>

<style>
.cart-container h1 {
  color: #42b983;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 50px;
}
.checkout-modal {
  display: flex;
  justify-content: flex-end;
  padding: 10px 50px;
}
</style>
