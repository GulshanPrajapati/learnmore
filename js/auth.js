// test server url
// let baseurl = "http://127.0.0.1:5500/learnmore/";

// live server url
let baseurl = "https://jaiswarrahul29.github.io/learnmore/";

// show loader on page load
$(document).ready(function () {
  // $(".loading").hide();
});

// initializeApp firebase
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBABYSKw9SNQ4zEHTP9wYC-gDVw_dy2XjI",
  authDomain: "webdemo-c1945.firebaseapp.com",
  databaseURL: "https://webdemo-c1945.firebaseio.com",
  projectId: "webdemo-c1945",
  storageBucket: "webdemo-c1945.appspot.com",
  messagingSenderId: "448312953544",
  appId: "1:448312953544:web:34a8cb12d55ec12cb933fd",
  measurementId: "G-2C0N9ER52Z",
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

// on state change
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    console.log("Logged In");
    checkUserGoal(uid);
    //check user have goal set or not
  } else {
    window.location = baseurl + "login.html";
  }
});
//function for checking user goal is set or not
function checkUserGoal(uid) {
  var goalAvai = false;
  db.collection("goals").onSnapshot((querySnapshot) => {
    if (querySnapshot.empty == true) {
      window.location = baseurl + "pages/addgoal.html";
    } else {
      querySnapshot.forEach((querySnapshot) => {
        // console.log(querySnapshot.data())
        if (querySnapshot.data()["uid"] == uid) {
          //if goal available then set true
          goalAvai = true;
        } else {
          // if not available then redirect to add goal page
          // window.location = baseurl + "pages/addgoal.html";
        }
      });
    }
    if (goalAvai == true) {
      $(".loading").hide();
    } else {
      window.location = baseurl + "pages/addgoal.html";
    }
  });
}
