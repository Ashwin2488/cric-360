importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBnBN3s-MI2afWSZaoouRuRBZ82j8p7lrI',
  messagingSenderId: '839462987155',
  projectId: 'magnets-cc',
  appId: '1:839462987155:web:5da33d94bfcec64317b466'
});

const messaging = firebase.messaging();
