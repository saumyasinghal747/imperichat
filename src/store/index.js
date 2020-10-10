import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {firestore} from "../firebase";


const asgConverter = {
  fromFirestore(snapshot, options){
    const data = snapshot.data(options);
    data.due = new Date(data.due);
    data.completed = undefined;
    data.completion_status = undefined;
    data.links = undefined;
    return data
  }
  // no need for toFirestore() since we never call set()
}

let sectionMsgRef;
let sectionAsgRef;

export default new Vuex.Store({
  state: {
    user:null, //firebase user object. now can do "v-if user"
    darkMode:false,
courses:[],
    showDrawer:true,
    activeSection:null,
    assignments:[],
    messages:[
     /* {
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
      }*/
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
    },
    setSection(state,sectionId){
      state.activeSection = sectionId
    },
    openSectionAssignments(state,sectionId){


      state.assignments = [];
      if (sectionAsgRef){
        sectionAsgRef()
      }

      sectionAsgRef = firestore.collection(`sections/${sectionId}/assignments`).withConverter(asgConverter).orderBy('due','desc').onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (data) {
          if (data.type !== "added"){
            return;
          }
          state.assignments.push(data.doc.data())
        })
      });
    }
    ,
    openSectionChat(state,sectionId){
      state.messages = []
      // we also have to set an event listener for the messages


      if (sectionMsgRef){
        sectionMsgRef();
      }

      sectionMsgRef = firestore.collection(`sections/${sectionId}/chat`).orderBy('time').onSnapshot(function (snapshot) {

        snapshot.docChanges().forEach(async function (data) {
          if (data.type !== "added"){
            return
          }

          const values = data.doc.data();
          const sender = (await values.user.get()).data();
          state.messages.push({
            message:values.message,
            senderId: sender.uid,
            senderPhoto: sender.photoURL,
            senderName: sender.displayName,
            time: values.time.toDate(),
            bot: sender.bot
          }); // convert it into a format that the thing can understand
        });

      })
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



