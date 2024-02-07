<template>
  <div class="header">
    <Title msg="Мои назначенные курсы" />
    <router-link to="/assign_course">
      <button>Назначить курс</button>
    </router-link>
  </div>
  <custom-input :dispatchMethod="'fetchMyCourses'" />
  <div class="select-wrapper">
    <v-select
      label="Продолжительность"
      item-title="text"
      item-value="value"
      v-model="selectedFilterElem"
      :items="filterElems"
      @update:model-value="setFilterElem"
      variant="solo-filled"
    ></v-select>
  </div>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Название</th>
        <th class="text-left">Статус</th>
        <th class="text-left"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="course in courses" :key="course.id">
        <td>
          <router-link :to="`/courses/${course.id}`">
            <p class="text-clickable">{{ course.name }}</p>
          </router-link>
        </td>
        <td>{{ course.status }}</td>
        <td></td>
      </tr>
    </tbody>
  </v-table>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-container class="max-width">
          <v-pagination
            class="my-4"
            v-model="page"
            @update:model-value="setPage"
            :length="pages_count"
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { watch } from "vue";
import { mapActions, mapGetters } from "vuex";
import CustomInput from "./CustomInput.vue";
import Title from "./Title.vue";

export default {
  name: "MyCourses",
  components: {
    CustomInput,
    Title,
  },
  data() {
    return {
      page: 1,
      filterElems: [
        {
          text: "Не указано",
          value: "empty",
        },
        {
          text: "Менее 10 дней",
          value: "less",
        },
        {
          text: "Более 10 дней",
          value: "more",
        },
      ],
      selectedFilterElem: "",
    };
  },
  computed: {
    ...mapGetters(["getMyCourses", "getPage", "getSearch", "getFilterValue"]),
    courses() {
      return this.getMyCourses.list;
    },
    pages_count() {
      return (
        Math.ceil(this.getMyCourses.total / this.getMyCourses.page_size) || 1
      );
    },
  },
  created() {
    this.resetState();
    this.fetchMyCourses();
  },
  mounted() {
    watch(
      () => [this.getSearch, this.getFilterValue],
      () => {
        this.page = 1;
      }
    );
  },
  methods: {
    ...mapActions([
      "fetchMyCourses",
      "changePage",
      "changeFilterParam",
      "resetState",
    ]),
    setPage(page) {
      this.page = page;
      this.changePage({
        page: page,
        method: "fetchMyCourses",
      });
    },
    setFilterElem(elem) {
      this.changeFilterParam({
        value: elem,
        method: "fetchMyCourses",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.select-wrapper {
  max-width: 450px;
}
</style>
