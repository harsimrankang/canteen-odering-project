import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage'





var firebaseConfig = {
    apiKey: "AIzaSyBWkcnuIWQfwWKF9iHzbDyopT6fdqi02X8",
    authDomain: "canteen-ordering-3d30c.firebaseapp.com",
    databaseURL: "https://canteen-ordering-3d30c.firebaseio.com",
    projectId: "canteen-ordering-3d30c",
    storageBucket: "canteen-ordering-3d30c.appspot.com",
    messagingSenderId: "155341264665",
    appId: "1:155341264665:web:6e6c97d269ce56ead59788",
    measurementId: "G-C199BELLX4"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
