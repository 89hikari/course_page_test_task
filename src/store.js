import { createStore } from 'vuex'
import axios from 'axios'
import { createBaseUrl } from './utils/requestUtils'

const initialState = {
  error: 0,
  message: '',
  search: '',
  page: 1,
  page_size: 10,
  filter_value: '',
  availible_courses: {},
  my_courses: {},
  course: {
    active_learning_id: '',
    course_id: '',
    name: '',
    activation_date: '',
    max_end_date: '',
    duration: 0,
    img_id: '',
    max_score: 0,
    current_score: 0,
    percent_score: 0,
    launch_str: ''
  }
}

export default createStore({
  state: { ...initialState },
  getters: {
    getMyCourses: state => state.my_courses,
    getAllCourses: state => state.availible_courses,
    getPage: state => state.page,
    getSearch: state => state.search,
    getFilterValue: state => state.filter_value,
    getCourse: state => state.course
  },
  actions: {
    async fetchMyCourses ({ commit, state }) {
      try {
        const response = await axios.get(
          createBaseUrl({
            action: 'MyCourses',
            search: state.search,
            page: state.page,
            duration: state.filter_value,
            page_size: state.page_size
          }),
          {
            withCredentials: true
          }
        )

        if (response.data?.error === 1) {
          commit('SET_ERROR', response.data?.message)
          return
        }

        commit('SET_MY_COURSES', response.data?.result)
      } catch (error) {
        commit('SET_ERROR', error)
      }
    },
    async fetchAllCourses ({ commit, state }) {
      try {
        const response = await axios.get(
          createBaseUrl({
            action: 'AvailibleCourses',
            search: state.search,
            page: state.page,
            status: state.filter_value,
            page_size: state.page_size
          }),
          {
            withCredentials: true
          }
        )

        if (response.data?.error === 1) {
          commit('SET_ERROR', response.data?.message)
          return
        }

        commit('SET_ALL_COURSES', response.data?.result)
      } catch (error) {
        commit('SET_ERROR', error)
      }
    },
    async fetchCourse ({ commit }, course_id) {
      try {
        const response = await axios.get(
          createBaseUrl({
            action: 'Course',
            course_id: course_id
          }),
          {
            withCredentials: true
          }
        )

        if (response.data?.error === 1) {
          commit('SET_ERROR', response.data?.message)
          return
        }

        commit('SET_COURSE', response.data?.result)
      } catch (error) {
        commit('SET_ERROR', error)
      }
    },
    async assignCourse ({ commit }, course_id) {
      try {
        await axios.post(
          createBaseUrl({
            action: 'AssignCourse',
            course_id: course_id
          }),
          {
            withCredentials: true
          }
        )
      } catch (error) {
        commit('SET_ERROR', error)
      }
    },
    async resetState ({ commit }) {
      commit('RESET_STATE')
    },
    async changePage ({ commit, dispatch }, params) {
      commit('SET_PAGE', params.page)
      dispatch(params.method)
    },
    async changeFilterParam ({ commit, dispatch }, params) {
      commit('SET_FILTER', params.value)
      commit('SET_PAGE', 1)
      dispatch(params.method)
    },
    async changeSearch ({ commit, dispatch }, params) {
      commit('SET_SEARCH', params.search)
      commit('SET_PAGE', 1)
      dispatch(params.method)
    }
  },
  mutations: {
    SET_MY_COURSES (state, courses) {
      state.my_courses = courses
    },
    SET_COURSE (state, course) {
      state.course = course
    },
    SET_ALL_COURSES (state, courses) {
      state.availible_courses = courses
    },
    SET_SUCCESS (state) {
      state.error = 0
      state.message = ''
    },
    SET_ERROR (state, message) {
      state.error = 1
      state.message = message
    },
    SET_PAGE (state, page) {
      state.page = page
    },
    SET_SEARCH (state, search) {
      state.search = search
    },
    SET_FILTER (state, value) {
      state.filter_value = value
    },
    RESET_STATE (state) {
      Object.assign(state, initialState)
    }
  }
})
