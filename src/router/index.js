import Vue from 'vue'
import VueRouter from 'vue-router'
import courseView from '../views/courseView.vue'
import courseHome from "../components/courseHome";
import chat from "../components/chat";
import Home from "../components/Home";
import store from "../store"
import courseAssignments from "../components/courseAssignments";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/courses/:courseid', component: courseView, name: "course",
    children:[
      {
        path:'', component:courseHome
      },
      {
        path:'chat', component:chat, name:"chat"
      },
      {
        path: 'assignments',component: courseAssignments,name: "assignments"
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched[1] && to.matched[1].name==="chat" && store.state.activeSection!==to.params.courseid){
    store.commit('openSectionChat',to.params.courseid)
    store.commit('openSectionAssignments',to.params.courseid)
  }
  if(to.matched[1] && to.matched[1].name==="assignments" && store.state.activeSection!==to.params.courseid){
    store.commit('openSectionChat',to.params.courseid)
    store.commit('openSectionAssignments',to.params.courseid);

  }
  next()
})

export default router
