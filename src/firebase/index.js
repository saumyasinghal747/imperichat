/**
 * Here, we will have client side access to firebase. What we will do here is sign in with google redirect,
 * and also fetch the auth token for use with the server.
 *
 * Do not use this file for accessing the server API, that will be another file.
 *
 * For contacting the database, only bind events so that you can update the render.
 *
 * All post requests need to go through the server.
 * */

import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDujMJt34ppKaRdF3Ib4cDYnhBQfzSMumA",
    authDomain: "imperichat.firebaseapp.com",
    databaseURL: "https://imperichat.firebaseio.com",
    projectId: "imperichat",
    storageBucket: "imperichat.appspot.com",
    messagingSenderId: "823473807878",
    appId: "1:823473807878:web:0abd20b0b9159167cfd987",
    measurementId: "G-FSTGYQRW9X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.analytics();
const auth = firebase.auth()
const database = firebase.database()
const firestore = firebase.firestore()
const studentProvider = new firebase.auth.GoogleAuthProvider();
const teacherProvider = new firebase.auth.GoogleAuthProvider();
studentProvider.setCustomParameters({
    hd:"pausd.us"
})
teacherProvider.setCustomParameters({
    hd:"pausd.org"
})
//so we'll also delete faulty users server side if they access or post data with non pausd accounts, but this is good deterrent.
export  {
    auth, studentProvider, teacherProvider, database,firestore
}
