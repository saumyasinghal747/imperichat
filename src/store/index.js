import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null, //firebase user object. now can do "v-if user"
    darkMode:false,
courses:[],
    messages:20
  },
  mutations: {
    setUser(state,user){
      state.user = user
    },
    setTheme(state,darkMode){
      state.darkMode = darkMode
    },
    setCourses(state,courses){
      state.courses = courses;
    }
  },
  actions: {
    toggleTheme(context){
      context.commit('setTheme',!context.state.darkMode)
    }
  },
  modules: {
  }
})
