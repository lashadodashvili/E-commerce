import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import ProductsPage from "../pages/ProductsPage.vue";
import Cart from "../pages/Cart.vue";
import ProductDetails from "../pages/ProductDetails.vue";
import { useProductsStore, useCartStore } from "../stores/products";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/ProductsPage",
      name: "ProductsPage",
      component: ProductsPage,
      beforeEnter: (to, from, next) => {
        const productsStore = useProductsStore();
        if (productsStore.products.length === 0) {
          productsStore.fetchProducts().then(() => next());
        } else {
          next();
        }
      },
    },
    {
      path: "/Cart",
      name: "Cart",
      component: Cart,
      beforeEnter: (to, from, next) => {
        const cartStore = useCartStore();
        if (cartStore.cart.length === 0) {
          cartStore.fetchCart().then(() => next());
        } else {
          next();
        }
      },
    },
    {
      path: "/productsDetails/:productId",
      name: "ProductDetails",
      component: ProductDetails,
    },
  ],
});

export default router;
