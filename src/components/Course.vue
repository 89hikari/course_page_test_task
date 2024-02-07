<template>
  <v-btn depressed elevation="2" small class="mb-5" @click="$router.go(-1)">
    Вернуться назад
  </v-btn>
  <Title :msg="course.name" />
  <v-list lines="two" v-if="course.active_learning_id">
    <div>
      <v-list-item
        title="Дата назначения"
        :subtitle="course.activation_date || 'Не указано'"
      ></v-list-item>
      <v-list-item
        title="Дата необходимого завершения"
        :subtitle="course.max_end_date || 'Не указано'"
      ></v-list-item>
      <v-list-item
        title="Максимальный балл"
        :subtitle="course.max_score || 'Не указано'"
      ></v-list-item>
      <v-list-item
        title="Текущий балл"
        :subtitle="course.current_score || 'Нет данных'"
      ></v-list-item>
      <v-list-item
        title="Процент прохождения"
        :subtitle="
          course.percent_score ? `${course.percent_score}%` : 'Нет данных'
        "
      ></v-list-item>
      <v-list-item
        title="Длительность обучения (в днях)"
        :subtitle="course.duration || 'Не указано'"
      ></v-list-item>
    </div>
    <v-btn
      depressed
      elevation="9"
      outlined
      color="success"
      small
      text
      class="mb-5"
      @click="launch"
    >
      Запустить
    </v-btn>
  </v-list>
  <div v-else>
    <v-card-title class="text-h6 text-md-h5 text-lg-h4 mb-10"
      >Этот курс ещё не назначен.</v-card-title
    >
    <v-btn
      depressed
      elevation="9"
      outlined
      color="success"
      small
      text
      class="mb-5"
      @click="assignCourseClick"
    >
      Назначить
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Title from "./Title.vue";

export default {
  name: "Course",
  components: {
    Title,
  },
  data() {
    return {
      course_id: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters(["getCourse"]),
    course() {
      return this.getCourse;
    },
  },
  created() {
    this.resetState();
    this.fetchCourse(this.course_id);
  },
  mounted() {},
  methods: {
    ...mapActions(["fetchCourse", "resetState", "assignCourse"]),
    async assignCourseClick() {
      await this.assignCourse(this.course_id);
      this.fetchCourse(this.course_id);
    },
    launch() {
      window.open(this.course.launch_str, "_blank");
    },
  },
};
</script>

<style scoped lang="scss"></style>
