// // show loader on page load
// // $(document).ready(function () {
// //   $(".loading").hide();
// // });

// // initializeApp firebase
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

// //-----------on state change------------------
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     $("#useruid").val(user.uid);
//     $("#usernumber").text(
//       user.phoneNumber ? user.phoneNumber : "Number Not Rgistered"
//     );

//     // fetch profile picture from firestore
//     db.collection(user.uid)
//       .doc("userDetails")
//       .onSnapshot((doc) => {
//         var profileLink = doc.data()["profileLink"];
//         var name = doc.data()["name"];
//         var qualification = doc.data()["qualification"];
//         var university = doc.data()["university"];
//         var email = doc.data()["email"];
//         var Number = user.phoneNumber
//         $(".profile_image").attr("src", profileLink);
//         $("#username").text(name ? name : "Unknown");
//         $("#useremail").text(email ? email : "Email Not Rgistered");

//         // setting my account details if already filled
//         $("#update_name").val(name?name:'');
//         $("#update_email").val(email?email:'');
//         $("#update_number").val(Number);
//         $("#update_qualification").val(qualification?qualification:'');
//         $("#update_university_name").val(university?university:'');

//         $(".loading").hide();
//       });
//   } else {
//     window.location = "../login.html";
//   }
// });

//------------------logout script--------------------------
$(".logout_btn").click(function () {
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

//--------get account update panel--------------------------
$(".account").on("click", function (e) {
  e.preventDefault();
  $(this).parent().find(".col_data").animate({ bottom: "0em" });
  // console.log('account btn clicked')
  // $(this).find(".icon").toggleClass("rotate_icon");
});

//-------- Animate profile picture panel ----------
$(".profile_image").click(function () {
  $("#set_profile").animate({ left: "0" });
});

//---------closing profile picture panel-----
$("#set_profile_close").click(function () {
  $("#set_profile").animate({ left: "-100em" }, "slow");
});

// onclick to image store the link to firestore database and change profile picture
$(".setimage").click(function () {
  $(".setimage").css("border", "none");
  $(this).css("border", "2px solid white");

  //---updating script-------------------
  var user_uid = $("#useruid").val();
  db.collection(user_uid)
    .doc("userDetails")
    .update({
      profileLink: $(this).attr("src"),
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  $(".profile_image").attr("src", $(this).attr("src"));
});

// toggling settings module
$("#cancel_btn").click(function (e) {
  e.preventDefault();
  $(this).parent().parent().animate({ bottom: "-300em" });
  $(
    "#update_name,#update_email,#update_number,#update_qualification,#update_university_name"
  ).css("border", "none");
  // console.log('cancel btn clicked')
});

//updating user profile and saving into localstorage
$("#update_btn").click(function () {
  if ($("#update_name").val() == "") {
    $("#update_name").css("border", "1px solid red");
  }
  if ($("#update_email").val() == "") {
    $("#update_email").css("border", "1px solid red");
  }
  if ($("#update_number").val() == "") {
    $("#update_number").css("border", "1px solid red");
  }
  if ($("#update_qualification").val() == "") {
    $("#update_qualification").css("border", "1px solid red");
  }
  if ($("#update_university_name").val() == "") {
    $("#update_university_name").css("border", "1px solid red");
  }

  if (
    $("#update_name").val() != "" &&
    $("#update_email").val() != "" &&
    $("#update_number").val() != "" &&
    $("#update_qualification").val() != "" &&
    $("#update_university_name").val() != ""
  ) {
    var user_uid = $("#useruid").val();
    db.collection(user_uid)
      .doc("userDetails")
      .update({
        name: $("#update_name").val(),
        email: $("#update_email").val(),
        qualification: $("#update_qualification").val(),
        university: $("#update_university_name").val(),
        number: $("#update_number").val(),
      })
      .then(() => {
        console.log("Document successfully written!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        window.location.reload();
      });
  }
});
