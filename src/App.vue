<template>
  <div id="app">
    <NavigationBar />
    <router-view />
  </div>
</template>

<script>
import NavigationBar from "./components/navbar";

export default {
  name: "App",
  components: {
    NavigationBar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  box-sizing: border-box;
}
body {
  padding: 0;
  margin: 0;
  width: 100%;
  overflow: auto;
}
p {
  margin: 0;
}
</style>
