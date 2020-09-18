const admin = require("firebase-admin");
const firebase = require('firebase')

const serviceAccount = require("./proyecto-hys-node-firebase-adminsdk-pxeqg-a9023a4f36.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://proyecto-hys-node.firebaseio.com"
});

var firebaseConfig = {
  apiKey: "AIzaSyAye2n4AROAMpQM4E9EaQeO9Un7a0fzCK0",
  authDomain: "proyecto-hys-node.firebaseapp.com",
  databaseURL: "https://proyecto-hys-node.firebaseio.com",
  projectId: "proyecto-hys-node",
  storageBucket: "proyecto-hys-node.appspot.com",
  messagingSenderId: "846991584696",
  appId: "1:846991584696:web:2d3c773c5d25deb96a734d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = {
  admin,
  firebase
};