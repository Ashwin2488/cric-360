importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBUBtdCPaXn1-enewwItaKfOHZKYeY12H8',
  messagingSenderId: '455893870680',
  projectId: 'hawkeyes-cc',
  appId: '1:455893870680:web:bf1472757fd646bcebc22d'
});

const messaging = firebase.messaging();
