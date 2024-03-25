<template>
  <div
    class="cart"
    v-for="item in cartData"
    :key="item._id"
    @updateCart="fetchCart"
    @click="openProductDetails(item.product._id)"
  >
    <div class="img-container">
      <img
        class="cart-img"
        :src="
          item.product?.main_img
            ? item.product.main_img
            : 'path/to/your/fallback/image.jpg'
        "
      />
    </div>
    <div class="content-wrapper">
      <p class="title">{{ item.product?.title ? item.product.title : "" }}</p>
      <p>Price:${{ item.product?.price ? item.product.price : "" }}</p>
      <p>Quantity:{{ item.quantity ? item.quantity : "" }}</p>
      <p class="price">
        Total Price:${{
          item.product?.price || item.quantity
            ? item.product.price * item.quantity
            : ""
        }}
      </p>
    </div>
    <div class="button-wrapper">
      <button @click.stop="decrease(item)">-</button>
      <p>{{ item.quantity ? item.quantity : "" }}</p>
      <button @click.stop="increase(item)">+</button>
      <button @click.stop="deleteCartItem(item._id)">delete</button>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "../../stores/products.js";
import { toRefs } from "vue";
export default {
  name: "CartItem",
  props: {
    cart: Array,
  },
  emits: ["updateCart"],
  setup() {
    const cartStore = useCartStore();
    const { cart: cartData } = toRefs(cartStore);

    const increase = async (item) => {
      await cartStore.updateCartItemQuantity(item._id, 1);
    };

    const decrease = async (item) => {
      await cartStore.updateCartItemQuantity(item._id, -1);
    };

    const deleteCartItem = async (itemId) => {
      await cartStore.deleteCartItem(itemId);
    };

    return { increase, decrease, deleteCartItem, cartData };
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
.cart {
  display: flex;
  border: 1px solid black;
  border-radius: 12px;
  column-gap: 12px;
  width: 100%;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
}
.img-container {
  display: flex;
  padding-left: 50px;
}
.cart-img {
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
  align-items: center;
  padding: 8px;
}
.button-wrapper {
  display: flex;
  padding-right: 50px;
  gap: 10px;
  align-items: center;
}

.button-wrapper button {
  cursor: pointer;
  border: none;
  outline: none;
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s;
}

.button-wrapper button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.button-wrapper button:active {
  transform: scale(0.95);
}

.button-wrapper p {
  margin: 0;
  padding: 10px 13px;
  background-color: #f8f9fa;
  border-radius: 5px;
  color: #212529;
}
</style>
