import * as firebase from 'firebase';
import 'firebase/firebase-storage'














// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/8.0.2/firebase-app.js"></script>


//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/8.0.2/firebase-analytics.js"></script>

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const  firebaseConfig = {
    apiKey: "AIzaSyCgetD7UXzlWpPkwZ-in35B5z-bVqNPLXE",
    authDomain: "vegifood-47a20.firebaseapp.com",
    databaseURL: "https://vegifood-47a20.firebaseio.com",
    projectId: "vegifood-47a20",
    storageBucket: "vegifood-47a20.appspot.com",
    messagingSenderId: "220407613081",
    appId: "1:220407613081:web:3afa50a78518a7533f9a08",
    measurementId: "G-RW98CM1CGJ"
  };



  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

  export { firebase}

 

