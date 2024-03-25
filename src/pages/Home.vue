<template>
  <div class="home">
    <h1>Home Page</h1>
    <AddProduct />
  </div>
</template>
<script>
import AddProduct from "../components/add-data/AddProduct.vue";
export default {
  name: "HomePage",
  components: {
    AddProduct,
  },
};
</script>

<style>
.home {
  text-align: center;
}

.home h1 {
  color: #42b983;
}

.home p {
  margin: 20px 0;
  color: #35495e;
}

.home a {
  display: inline-block;
  background-color: #42b983;
  color: #ffffff;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.home a:hover {
  background-color: #333;
}
</style>
