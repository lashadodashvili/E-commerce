<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>

      <div v-for="(item, index) in cartData" :key="item._id">
        <div>
          <img
            class="detail-img"
            :src="item.product.main_img ? item.product?.main_img : ''"
            :alt="`Product image ${index}`"
          />
        </div>
        <p>Title: {{ item.product.title ? item.product.title : "" }}</p>
        <p>Quantity: {{ item.quantity ? item.quantity : "" }}</p>
        <p>Price: ${{ item.product?.price ? item.product.price : "" }}</p>
        <p>Subtotal: ${{ item.quantity * item.product.price }}</p>
      </div>

      <div class="title">Total Sum: ${{ totalSum }}</div>
    </div>
  </div>
</template>

<script>
import { computed, watch } from "vue";
export default {
  name: "CheckoutModal",
  props: {
    isVisible: Boolean,
    cartData: Array,
  },
  emits: ["close"],
  setup(props, { emit }) {
    const totalSum = computed(() => {
      return props.cartData.reduce((acc, item) => {
        return acc + item.quantity * item.product.price;
      }, 0);
    });

    function closeModal() {
      emit("close");
    }
    watch(
      () => props.cartData,
      (newValue) => {
        console.log("cartData updated:", newValue);
      },
      {
        deep: true,
      }
    );
    return {
      closeModal,
      totalSum,
    };
  },
};
</script>

<style>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 12px;
  width: 50%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
