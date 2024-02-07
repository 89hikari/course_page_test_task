<template>
  <h1>{{ msg }}</h1>
</template>

<script>
export default {
  name: "Title",
  props: {
    msg: String,
  },
};
</script>

<style scoped>
h1 {
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 35px;
}
</style>
