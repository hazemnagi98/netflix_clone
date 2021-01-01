import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
const firebaseConfig = {
  apiKey: "AIzaSyA6qfhNOg54A8Evfe0G2PeRS2h4f81Pt3k",
  authDomain: "oppa-coding-challenge.firebaseapp.com",
  databaseURL: "https://oppa-coding-challenge.firebaseio.com",
  projectId: "oppa-coding-challenge",
  storageBucket: "oppa-coding-challenge.appspot.com",
  messagingSenderId: "246738910516",
  appId: "1:246738910516:web:155d7bef48ef1f1132f961",
};

firebase.initializeApp(firebaseConfig);

//for cache in reads
firebase
  .firestore()
  .enablePersistence({ synchronizeTabs: true })
  .catch(function (err) {
    console.log(err);
    if (err.code === "failed-precondition") {
      // Multiple tabs open, persistence can only be enabled
      // in one tab at a a time.
    } else if (err.code === "unimplemented") {
      // The current browser does not support all of the
      // features required to enable persistence
    }
  });

firebase.functions().useEmulator("localhost", 5001);

export const db = firebase.firestore();
export const firestore = firebase.firestore;
export const auth = firebase.auth();
