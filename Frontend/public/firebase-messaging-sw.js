importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyBM5wCW5G9aXhbzCTjGuTqwhfS5W13fhUw",
    authDomain: "gigxnow-c4335.firebaseapp.com",
    projectId: "gigxnow-c4335",
    storageBucket: "gigxnow-c4335.appspot.com",
    messagingSenderId: "296351545552",
    appId: "1:296351545552:web:1a3b1abc7a400a108586d5",
    measurementId: "G-BVCSMWF93K"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});