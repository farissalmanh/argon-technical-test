importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyCt2v5H0ACyhLpY-Rb44SQMdVL248u8Ls4",
  authDomain: "argon-test-2730c.firebaseapp.com",
  projectId: "argon-test-2730c",
  storageBucket: "argon-test-2730c.appspot.com",
  messagingSenderId: "476806713502",
  appId: "1:476806713502:web:c5449c0b6d0a09f8eb2b8f",
  measurementId: "G-H76W9TRYB0"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log('Background Message:', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});