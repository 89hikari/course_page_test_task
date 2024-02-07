<template>
  <div>
    <input
      type="text"
      :name="name"
      v-model="value"
      v-on:keyup.enter="onButtonClick"
      placeholder="Поиск по названию"
    />
    <button @click="onButtonClick">Поиск</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "CustomInput",
  props: {
    dispatchMethod: String,
  },
  data() {
    return {
      value: "",
    };
  },
  methods: {
    ...mapActions(["changeSearch"]),
    onButtonClick() {
      this.changeSearch({
        search: this.value,
        method: this.dispatchMethod,
      });
    },
  },
};
</script>

<style scoped lang="scss">
div {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 15px;
  width: max-content;
  overflow: hidden;
  margin-bottom: 20px;
  input {
    display: block;
    margin: 0;
    padding: 15px;
    color: inherit;
    font-family: inherit;
    font-weight: inherit;
    border: none;
    border-radius: 0.4rem;
    &:focus {
      outline: none;
    }
  }
  button {
    background-color: rgb(169, 206, 255);
    color: azure;
    width: 70px;
    display: block;
    flex: 1;
    &:hover {
      background-color: rgb(96, 165, 255);
      transition: 0.2s;
    }
  }
}
</style>
