<template>
  <v-dialog v-model="dialog" width="auto">
    <v-card>
      <div class="dialog">
        <p>Назначить курс: {{ courseToAssignName }}?</p>
        <div class="dialog-btns">
          <v-btn variant="elevated" color="success" @click="assignCourseClick">
            Да
          </v-btn>
          <v-btn variant="tonal" color="error" @click="dialog = false">
            Нет
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
  <div class="header">
    <Title msg="Назначить курс" />
    <router-link to="/courses">
      <button>К моим курсам</button>
    </router-link>
  </div>
  <custom-input :dispatchMethod="'fetchAllCourses'" />
  <div class="select-wrapper">
    <v-select
      label="Статус курса"
      item-title="text"
      item-value="value"
      v-model="selectedFilterElem"
      :items="filterElems"
      @update:model-value="setFilterElem"
      variant="solo-filled"
    ></v-select>
  </div>
  <v-table>
    <tbody>
      <tr v-for="course in courses" :key="course.id">
        <td>
          <router-link :to="`/courses/${course.id}`">
            <p>{{ course.name }}</p>
          </router-link>
        </td>
        <td>
          <button
            v-if="course.can_assign"
            class="assign-course"
            @click="openModal(course.name, course.id)"
          >
            Назначить
          </button>
        </td>
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
import router from "@/router";

export default {
  name: "AssignCourses",
  components: {
    CustomInput,
    Title,
  },
  data() {
    return {
      page: 1,
      dialog: false,
      courseToAssignName: "",
      courseToAssignId: "",
      filterElems: [
        {
          text: "Открытый",
          value: "publish",
        },
        {
          text: "Проект",
          value: "project",
        },
        {
          text: "Архивный",
          value: "archive",
        },
      ],
      selectedFilterElem: "",
    };
  },
  computed: {
    ...mapGetters(["getAllCourses", "getPage", "getSearch", "getFilterValue"]),
    courses() {
      return this.getAllCourses.list;
    },
    pages_count() {
      return (
        Math.ceil(this.getAllCourses.total / this.getAllCourses.page_size) || 1
      );
    },
  },
  created() {
    this.resetState();
    this.fetchAllCourses();
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
      "fetchAllCourses",
      "resetState",
      "changePage",
      "changeFilterParam",
      "assignCourse",
    ]),
    setPage(page) {
      this.page = page;
      this.changePage({
        page: page,
        method: "fetchAllCourses",
      });
    },
    setFilterElem(elem) {
      this.changeFilterParam({
        value: elem,
        method: "fetchAllCourses",
      });
    },
    openModal(name, id) {
      this.courseToAssignName = name;
      this.courseToAssignId = id;
      this.dialog = true;
    },
    async assignCourseClick() {
      await this.assignCourse(this.courseToAssignId);
      router.push(`/courses/${this.courseToAssignId}`);
    },
  },
};
</script>

<style scoped lang="scss">
.select-wrapper {
  max-width: 450px;
}
.assign-course {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgb(255, 202, 202);
}
.dialog {
  width: 800px;
  background-color: #fff;
  height: 300px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  p {
    font-weight: bold;
    font-size: 28px;
  }
  .dialog-btns {
    display: flex;
    justify-content: space-between;
    margin-top: auto;
  }
}
</style>
