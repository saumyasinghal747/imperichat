import {auth, database} from "./index";
import store from "../store"
let userCoursesRef;

auth.onAuthStateChanged(function (user) {
    // someone just signed in/out, or the user object has changed.
    store.commit('setUser',user)
    if (user){
        // delete google-only accounts and redirect to sgy
        if (auth.currentUser.providerData.filter(function (x) {
            return x.providerId == "password"
        }).length === 0){
            //delete the user
            auth.currentUser.delete().then(function () {
                // and forward them to Schoology mwahaha
                document.location = "http://mangoice.herokuapp.com/imperichat/please-sgy"
            })

        }
        if (userCoursesRef){
            //disconnect a previous listener
            userCoursesRef.off()
        }
        userCoursesRef = database.ref(`/users/${user.uid}/courses`);
        userCoursesRef.on('value',function (snapshot) {
            store.commit('setCourses',snapshot.val())
        })


        //  this is when we fetch their courses from Schoology.
        // courses = await fetch(http://localhost:3000/courses?user=uid&auth=)
        // store.commit('setCourses',courses);

    }
    else {
        if (userCoursesRef){
            //disconnect a previous listener
            userCoursesRef.off()
        }
        store.commit('setCourses',[])  //reset data
    }
})






