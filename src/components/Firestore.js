const firebase = require('firebase/app');
require('firebase/firestore');

const config = {
  apiKey: process.env.REACT_APP_GOOGLE_CLOUD_API_KEY,
  authDomain: 'ballbuddy.firebaseapp.com',
  databaseURL: 'https://ballbuddy.firebaseio.com',
  projectId: 'ballbuddy',
  storageBucket: 'ballbuddy.appspot.com',
  messagingSenderId: '978963257379',
  appId: '1:978963257379:web:f0f171e6d1440e3927f996',
};

firebase.initializeApp(config);

export default firebase;
