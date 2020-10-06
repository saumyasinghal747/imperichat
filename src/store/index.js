import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null, //firebase user object. now can do "v-if user"
    darkMode:false,
courses:[],
    showDrawer:true,
    messages:[
      {
        senderId:"uid1",
        senderName: "Homework Central",
        senderPhoto:"https://homeworkcentral.web.app/favicon.png",
        message:"Wow! That chat begins!",
        time: new Date(2020,9,5,20,33,15)
      },
      {
        senderId:"uid2",
        senderName:"YMath",
        senderPhoto:"https://ymath.io/favicon.png",
        message:"Yeah!!",
        time: new Date(2020,9,5,20,35,11)
      },
      {
        senderId:"uid1",
        senderName: "Homework Central",
        senderPhoto:"https://homeworkcentral.web.app/favicon.png",
        message:"Isn't this amazing?",
        time: new Date(2020,9,5,20,36,2)
      },
      {
        senderId:"uid3",
        senderName: "Gunn Campus",
        senderPhoto:"https://gunnwebapp.web.app/favicon.png",
        message:"Woah I am amazed!",
        time: new Date(2020,9,5,20,36,2)
      }
    ]
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
    },
    toggleDrawer(state){
      state.showDrawer = !state.showDrawer
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
