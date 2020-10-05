import Vue from 'vue'
import VueRouter from 'vue-router'
import courseView from '../views/courseView.vue'
import courseHome from "../components/courseHome";
import chat from "../components/chat";
import Home from "../components/Home";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/courses/:courseid', component: courseView,
    children:[
      {
        path:'', component:courseHome
      },
      {
        path:'chat', component:chat
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
