//random string generated
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}


//fetch course data
function getCourseData(uid) {
  db.collection("courses")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id);
        $('#course_data').append('<option value="' + doc.id + '">'+doc.id+'</option>');
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

//set goal function
function setGoal(uid,goalname, course, module, duration, time) {
  var userId = uid;
  var refId = makeid(20)
  var data = {
    uid:userId,
    goalname:goalname,
    course:course,
    module:module,
    duration:duration,
    settime:time,
    refId:refId
  }
  
  var goals = db.collection("goals").doc(refId);
  goals.set(data)
    .then(() => {
      console.log("Document successfully updated!");
      window.location = "../index.html";
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
}

//on next button clicked
function nextButtonClick(uid) {
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
          setGoal(uid,goalname, course, module, duration, time);
        } else {
          var module = '';
          setGoal(uid,goalname, course, module, duration, time);
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
    }
  })
}





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
    var uid = user.uid;

    $("#username").text(user.displayName ? user.displayName : "Unknown");
    $("#useremail").text(user.email ? user.email : "Email Not Rgistered");
    $("#usernumber").text(
      user.phoneNumber ? user.phoneNumber : "Number Not Rgistered"
    );

    getCourseData(uid);
    nextButtonClick(uid)
    // console.log(user.phoneNumber ? user.phoneNumber : user.email);
    // console.log(uid);
    // console.log("Logged In");
    // $(".loading").hide();
  } else {
    window.location = "../login.html";
  }
});