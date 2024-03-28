<template>
  <div>
    <div v-if="transitionType === 'fade'">
      <!-- Fade Transition -->
      <transition
        :name="`fade`"
        :duration="transitionDuration * 1000"
        mode="out-in"
      >
        <div :key="currentPage" class="slider-page">
          <div
            v-for="(item, index) in currentItems"
            :key="index"
            class="slider-item"
          >
            <component :is="item.type" :src="item.src"></component>
          </div>
        </div>
      </transition>
    </div>
    <div v-else-if="transitionType === 'scroll'" class="carousel-container">
      <!-- Carousel Transition -->
      <div class="carousel-track" :style="carouselStyle">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="carousel-item"
          :style="{ width: `${100 / itemsPerPage}%` }"
        >
          <component :is="item.type" :src="item.src"></component>
        </div>
      </div>
    </div>
    <div class="button-group">
      <button @click="prevPage">Prev</button>
      <button @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SliderComponent",
  props: {
    items: {
      type: Array,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      required: true,
    },
    transitionType: {
      type: String,
      default: "fade",
    },
    transitionDuration: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    currentItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.items.slice(start, end);
    },
    carouselStyle() {
      if (this.transitionType === "scroll") {
        return {
          transition: `transform ${this.transitionDuration}s ease`,
          transform: `translateX(-${
            (this.currentPage - 1) * (100 / this.itemsPerPage)
          }%)`,
        };
      }
      return {};
    },
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-duration) ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.carousel-container {
  overflow: hidden;
  width: 100%;
}

.carousel-track {
  display: flex;
}

.carousel-item {
  flex: 0 0 auto;
}
.slider-page {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 25px;
}
.button-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
</style>
