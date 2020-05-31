import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBWF_PDaLODPxBbC3BcGyddmI8tfodx8us",
    authDomain: "workers-list-task.firebaseapp.com",
    databaseURL: "https://workers-list-task.firebaseio.com",
    projectId: "workers-list-task",
    storageBucket: "workers-list-task.appspot.com",
    messagingSenderId: "791833083184",
    appId: "1:791833083184:web:a5580df4170cb6c2a75cf5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;