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
        localStorage.setItem('userId', uid);
        //check user have goal set or not 
        checkUserGoal();
    } else {
        window.location = "https://jaiswarrahul29.github.io/learnmore/login.html";
    }
});

//function for checking user goal is set or not
function checkUserGoal() {
    var userId = localStorage.getItem('userId');
    var docRef = db.collection(userId).doc("goals");

    docRef.get().then((doc) => {
        if (doc.exists) {
            // console.log("Document data:", doc.data());
            $('.loading').hide();
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            window.location = "https://jaiswarrahul29.github.io/learnmore/pages/addgoal.html";
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}
