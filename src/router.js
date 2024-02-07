import { createRouter, createWebHistory } from 'vue-router'
import MyCourses from './components/MyCourses.vue'
import Course from './components/Course.vue'
import AssignCourses from './components/AssignCourses.vue'

const routes = [
  { path: '/courses', component: MyCourses },
  { path: '/courses/:id', component: Course },
  { path: '/assign_course', component: AssignCourses }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
