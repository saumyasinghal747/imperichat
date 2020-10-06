import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { auth } from './firebase'
import "./firebase/listeners"
import {
  MdApp,
  MdButton,
  MdContent,
  MdTabs,
  MdList,
  MdIcon,
  MdDrawer,
  MdToolbar, MdAvatar, MdMenu, MdBadge, MdField
} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
Vue.use(MdAvatar)
Vue.use(MdApp)
Vue.use(MdToolbar)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)
Vue.use(MdList)
Vue.use(MdIcon)
Vue.use(MdDrawer);
Vue.use(MdMenu);
Vue.use(MdBadge);
Vue.use(MdField);
Vue.use(require('vue-moment'));
Vue.config.productionTip = false
let app;





auth.onAuthStateChanged((user) => {

  if (!app) {
    app = new Vue({

      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
  if (!user){
   if ((new URLSearchParams(window.location.search)).has('t')){
     const token = (new URLSearchParams(window.location.search)).get('t');
     window.history.replaceState({page: location.pathname}, document.title, window.location.pathname);
     window.history.pushState({page: location.pathname}, document.title, window.location.pathname)
     auth.signInWithCustomToken(token); //i think we are fine :D
   }
  }

})

