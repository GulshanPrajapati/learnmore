// // show loader on page load
// $(document).ready(function () {
//   $(".loading").hide();
// });

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

// // on state change
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     $("#username").text(user.displayName ? user.displayName : "Unknown");
//     $("#useremail").text(user.email ? user.email : "Email Not Rgistered");
//     $("#usernumber").text(
//       user.phoneNumber ? user.phoneNumber : "Number Not Rgistered"
//     );
//     // console.log(user.phoneNumber ? user.phoneNumber : user.email);
//     // console.log(uid);
//     // console.log("Logged In");
//     // $(".loading").hide();
//   } else {
//     window.location = "../login.html";
//   }
// });

//sliding up adding panel
$('.add_btn').click(function () {
  $('.add_modal').animate({ bottom: "0" }, 'fast');
})
$('.close_add_modal').click(function () {
  $('.add_modal').animate({ bottom: "-100rem" }, 'slow');
})

//fetch select goal data 
function getGoalData() {
  var userId = localStorage.getItem('userId');

  const sfRef = db.collection(userId).doc('goals');
  const collections = sfRef.listCollections();
  collections.forEach(collection => {
    console.log('Found subcollection with id:', collection.id);
  });
}
getGoalData()

//get chapters data when user select there goal
$('#select_goal').change(function () {
  if ($('#select_goal').val() != '') {
    $('.add_btn').show();
    $('#data_contain').show();
  } else {
    $('.add_btn').hide();
    $('#data_contain').hide();
  }
})

