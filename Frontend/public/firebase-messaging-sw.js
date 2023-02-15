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

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  var promise = new Promise(function(resolve) {
    setTimeout(resolve, 500);
  }).then(function() {
    console.log("test data out", event.notification.data)
    return clients.openWindow(event.notification.data);
  });
  event.waitUntil(promise);
});

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});