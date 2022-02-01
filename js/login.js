$( window ).on("load", function() {
  // Handler for .load() called.
  $(".loading").hide();
});
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
    console.log(user.phoneNumber ? user.phoneNumber: user.email);
    console.log(uid);
    console.log("Logged In");
    window.location="index.html";
  }else{

  }
});

$("#send_btn").click(function () {
  if ($("#send_btn").attr("disabled")) {
    console.log("not working");
  } else {
    $(".loading").css("display", "block");
    var county_code = $("#country_code").val();
    var phone_number = $("#number").val();

    firebase.auth().useDeviceLanguage();
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("send_btn", {
      size: "invisible",
      callback: (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      },
    });

    const phoneNumber = county_code + phone_number;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        $(".enternumber_section").hide();
        $(".enterotp_section").show();
        $(".loading").hide();
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error);
        $(".loading").hide();
      });
  }
});

//----------------------------------------------------verify otp script----------------------------------------------------------------------------

// verifying the input digit is number or not
$("#number").keyup(function (e) {
  e.preventDefault();
  if (!$("#number").val().match("[0-9]{10}")) {
    $("#send_btn").attr("disabled", "disabled");
    $("#send_btn").css("background-color", "#5d3f6b7d");
    // console.log("Please put 10 digit mobile number");
    return;
  } else {
    $("#send_btn").removeAttr("disabled");
    $("#send_btn").css("background-color", "#5d3f6b");
  }
});

// replacing text or space
let digitValidate = function (ele) {
  ele.value = ele.value.replace(/[^0-9]/g, "");
};

// enter proper number then changing tabs
let tabChange = function (val) {
  let ele = document.querySelectorAll(".enterotp_section input");
  if (ele[val - 1].value != "") {
    ele[val].focus();
  } else if (ele[val - 1].value == "") {
    ele[val - 2].focus();
  }
};

// putting otp in one array
$(".otp").keyup(function () {
  var otp = [];
  for (i = 0; i < $(".otp").length; i++) {
    otp.push($(".otp")[i].value);
    var result = otp.filter((word) => word.trim().length > 0);
    // console.log(result)
  }
  // if we get all 6 digit otp then verify that
  if (result.length == 6) {
    // console.log(result);
    var code = result.join("");
    console.log(code);
    $("input").prop("disabled", true);
    $(".loading").show();

    confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user.phoneNumber);
        $(".loading").hide();
        $('.comment').text("Successfully Login");
        $('.comment').css('color','#4caf50');
        $('.comment').show();
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log(error);
        $(".loading").hide();
        $('.comment').show();
        $("input").prop("disabled", false);
      });
  }
});

//----------------------------------------------------- signin with google ------------------------------------------------------------------------

$(".google").click(function () {
  $(".loading").show();
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // console.log(user);
      console.log(user.email);
      $(".loading").hide();
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;

      console.log(errorMessage);
      $(".loading").hide();
      // ...
    });
});

