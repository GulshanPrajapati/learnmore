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
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     var uid = user.uid;
//     console.log(user.phoneNumber ? user.phoneNumber : user.email);
//     console.log(uid);
//     console.log("Logged In");
//     localStorage.setItem('userId', uid);

//     //check user have goal set or not 
//     checkUserGoal();
//     // $('.loading').hide();
//   } else {
//     window.location = "login.html";
//   }
// });

// logout 
$('#logout').click(function () {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    window.location.reload();
  }).catch((error) => {
    // An error happened.
  });
})

// message icon onclick css 
$('.message_icon').click(function () {
  $('.message_icon').css('background-color', 'rgba(68, 68, 68, 0.8)')
})

// toggling goal module 
$(".m_head").on('click', function () {
  $(this).parent().find(".module_data").toggle();
  $(this).parent().find('.icon').toggleClass('rotate_icon')
})



