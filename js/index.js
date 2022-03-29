// // // show loader on page load
// $(document).ready(function () {
//   // $('.loading').hide();
// });

// // initializeApp
// const firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyBABYSKw9SNQ4zEHTP9wYC-gDVw_dy2XjI",
//   authDomain: "webdemo-c1945.firebaseapp.com",
//   databaseURL: "https://webdemo-c1945.firebaseio.com",
//   projectId: "webdemo-c1945",
//   storageBucket: "webdemo-c1945.appspot.com",
//   messagingSenderId: "448312953544",
//   appId: "1:448312953544:web:34a8cb12d55ec12cb933fd",
//   measurementId: "G-2C0N9ER52Z",
// });
// const db = firebaseApp.firestore();
// const auth = firebaseApp.auth();
// // on state change
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    selectgoaldata(user.uid);
  }
});

// logout
$("#logout").click(function () {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      window.location.reload();
    })
    .catch((error) => {
      // An error happened.
    });
});

// message icon onclick css
$(".message_icon").click(function () {
  $(".message_icon").css("background-color", "rgba(68, 68, 68, 0.8)");
});

// toggling goal module
$(".m_head").on("click", function () {
  $(this).parent().find(".module_data").toggle();
  $(this).parent().find(".icon").toggleClass("rotate_icon");
});

//fetch goal in select
function selectgoaldata(uid) {
  db.collection("goals").onSnapshot((querySnapshot) => {
    querySnapshot.forEach((querySnapshot) => {
      // console.log(querySnapshot.data())
      // $('#select_goal').append('<option value="">Select Goal</option>');
      if (querySnapshot.data()["uid"] == uid) {
        $("#selectGoalData select").append(
          '<option value="' +
            querySnapshot.data()["refId"] +
            '">' +
            querySnapshot.data()["goalname"] +
            "</option>"
        );
        $(".loading").hide();
      } else {
        // if not available then redirect to add goal page
        window.location = baseurl + "pages/addgoal.html";
      }
    });
  });
}

$("#selectGoalData select").change(function () {
  var refId = $("#selectGoalData select").val();

  db.collection("goals")
    .doc(refId)
    .onSnapshot((doc) => {
      var data = doc.data();
      //get current date
      var date = new Date(doc.data()['duration']);
      var diff  = new Date(date - new Date());
      days  = Math.floor(diff/1000/60/60/24);
      var buddy =
        '<div class="row"><div class="heading">Buddy</div><div class="animated_icon"><lottie-player src="https://assets5.lottiefiles.com/packages/lf20_6chbdoa4.json" background="transparent" speed="1" loop autoplay><lottie-player></div><div class="score">335</div></div>';

        $('#information_contain').append(buddy);  

      var timeleft = '<div class="row"><div class="heading">time</div><div class="animated_icon"><lottie-player src="https://assets4.lottiefiles.com/packages/lf20_0mszk3tz.json" background="transparent" speed="1" loop autoplay><lottie-player></div><div class="score">1.5Hr</div></div>'

        $('#information_contain').append(timeleft);  

        var duration = '<div class="row"><div class="heading st">Days left</div><div class="animated_icon"><lottie-player src="https://assets6.lottiefiles.com/packages/lf20_zqw0q7sb.json" background="transparent" speed="1" loop autoplay ><lottie-player></div><div class="score">'+days+'</div></div>'

        $('#information_contain').append(duration);  
    });


    
});
