<template>
  <nav>
    <div class="nav-links">
      <router-link to="/">Home</router-link> |
      <router-link to="/ProductsPage">Products</router-link>
    </div>
    <div class="cart-icon">
      <router-link to="/cart">
        <font-awesome-icon icon="shopping-cart" />
        <span v-if="cartItemCount > 0" class="cart-item-count">{{
          cartItemCount
        }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { useCartStore } from "@/stores/products";
import { computed } from "vue";
export default {
  name: "NavigationBar",
  setup() {
    const cartStore = useCartStore();

    // Compute the cart item count based on the cart array length
    const cartItemCount = computed(() => cartStore.cart.length);

    return {
      cartItemCount,
    };
  },
};
</script>

<style>
/* Navigation bar styles */
nav {
  background-color: #f0f0f0;
  padding: 10px;
  position: relative;
}
.nav-links {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}
.cart-icon {
  margin-left: 80%;
}
nav a {
  text-decoration: none;
  margin: 0 10px;
  color: #333;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.cart-item-count {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.6em;
  position: relative;
  top: -10px;
  right: 10px;
}
</style>
