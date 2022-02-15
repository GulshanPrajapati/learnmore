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
    $('#username').text(user.displayName ? user.displayName : 'Unknown');
    $('#useremail').text(user.email ? user.email : 'Email Not Rgistered');
    $('#usernumber').text(user.phoneNumber ? user.phoneNumber: 'Number Not Rgistered');
    // console.log(user.phoneNumber ? user.phoneNumber : user.email);
    // console.log(uid);
    // console.log("Logged In");
    // $(".loading").hide();
  } else {
    window.location = "../login.html";
  }
});

// logout script
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

// toggling settings module
$('#cancel_btn').click(function(e){
  e.preventDefault()
  $(this).parent().parent().animate({bottom: '-300em'})
  // console.log('cancel btn clicked')
})
$(".account").on("click", function (e) {
  e.preventDefault()
  $(this).parent().find(".col_data").animate({bottom: '0em'});
  // console.log('account btn clicked')
  // $(this).find(".icon").toggleClass("rotate_icon"); 
});
// update profile picture js here 
$('.profile_image').click(function(){
  $('#set_profile').animate({left: "0"});
})
// onclick to profile picture showing other image to set and change 
$('#set_profile_close').click(function(){
  $('#set_profile').animate({left: "-100em"},'slow');
})
// onclick to image store the link to local storage and change profile picture
$('.setimage').click(function(){
  $('.setimage').css('border','none')
  $(this).css('border','2px solid white')
  localStorage.setItem("profile_image", $(this).attr('src'));
  $('.profile_image').attr('src',localStorage.getItem("profile_image"))
})
// fetch profile picture from local storage
$('.profile_image').attr('src',localStorage.getItem("profile_image"))