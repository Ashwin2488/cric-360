importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyChNOvUqfjN21X20JHaG87v5i8A5y_1EgU',
  messagingSenderId: '696772634186',
  projectId: 'chennai-bulls-cc',
  appId: '1:696772634186:web:2e50e0310d74136b1d28b3',
});

const messaging = firebase.messaging();
