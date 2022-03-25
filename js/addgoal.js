// show loader on page load
$(document).ready(function () {
  $(".loading").hide();
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
    $("#username").text(user.displayName ? user.displayName : "Unknown");
    $("#useremail").text(user.email ? user.email : "Email Not Rgistered");
    $("#usernumber").text(
      user.phoneNumber ? user.phoneNumber : "Number Not Rgistered"
    );
    // console.log(user.phoneNumber ? user.phoneNumber : user.email);
    // console.log(uid);
    // console.log("Logged In");
    // $(".loading").hide();
  } else {
    window.location = "../login.html";
  }
});


//fetch course data
function getCourseData() {
  var userId = localStorage.getItem('userId');
  db.collection("courses")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id);
        $('#course_data').append('<option value="' + doc.id + '"></option>');
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}
getCourseData();

//set goal function
function setGoal(goalname, course, module, duration, time) {
  var userId = localStorage.getItem('userId');
  var goals = db.collection(userId).doc("goals").collection(goalname).doc(goalname);
  goals.set({
    course: course,
    duration: duration,
    module: module,
    time: time
  })
    .then(() => {
      console.log("Document successfully updated!");
      window.location = "./addmodule.html?goal=" + goalname + "";
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
}

//on next button clicked
function nextButtonClick() {

  $('#submit').click(function () {
    var goalname = $("#goal_name").val();
    var course = $("#course").val();
    var duration = $("#duration").val();
    var time = $("#time").val();

    if (goalname == '') {
      $("#goal_name").css('border', '1px solid red');
      setTimeout(function () {
        $("#goal_name").css('border', 'none');
      }, 2000)
    }
    if (course == '') {
      $("#course").css('border', '1px solid red');
      setTimeout(function () {
        $("#course").css('border', 'none');
      }, 2000)
    }
    if (duration == '') {
      $("#duration").css('border', '1px solid red');
      setTimeout(function () {
        $("#duration").css('border', 'none');
      }, 2000)
    }
    if (time == '') {
      $("#time").css('border', '1px solid red');
      setTimeout(function () {
        $("#time").css('border', 'none');
      }, 2000)
    }

    if (goalname != '' && course != '' && duration != '' && time != '') {
      var getmodule = db.collection("courses").doc(course);
      getmodule.get().then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          var module = doc.data();
          setGoal(goalname, course, module, duration, time);
        } else {
          var module = "";
          setGoal(goalname, course, module, duration, time);
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
    }
  })
}


nextButtonClick()
