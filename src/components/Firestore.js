const firebase = require('firebase/app')
require('firebase/firestore')

const config = {
    apiKey: "AIzaSyAy5wTTEXTXkSbGnWvQNwD_fb-VaZc1qYk",
    authDomain: "ballbuddy.firebaseapp.com",
    databaseURL: "https://ballbuddy.firebaseio.com",
    projectId: "ballbuddy",
    storageBucket: "ballbuddy.appspot.com",
    messagingSenderId: "978963257379",
    appId: "1:978963257379:web:f0f171e6d1440e3927f996"
  };

firebase.initializeApp(config);

export default firebase