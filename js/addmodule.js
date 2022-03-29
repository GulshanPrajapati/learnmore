// on state change
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    checkUserGoalData(user.uid);
  } else {
    window.location = "../login.html";
  }
});

function checkUserGoalData(uid) {
  db.collection("goals").onSnapshot((querySnapshot) => {
    var module = [];
    querySnapshot.forEach((querySnapshot) => {
      // console.log(querySnapshot.data())
      // $('#select_goal').append('<option value="">Select Goal</option>');
      if (querySnapshot.data()["uid"] == uid) {
        var set = [
          querySnapshot.data()["refId"],
          querySnapshot.data()["goalname"],
        ];
        // module.push(querySnapshot.data()['uid'])
        //if goal available then hide loader

        $("#select_goal").append(
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
//get para from url and fetch current goal details
// function setselectoption() {
//   var url = window.location.href;
//   url = new URL(url);
//   var goalId = url.searchParams.get("goalId");
//   if (goalId != null) {
//     var docRef = db.collection("goals").doc(goalId);
//     docRef
//       .get()
//       .then((doc) => {
//         if (doc.exists) {
//           var data = doc.data();
//           // console.log(data);
//           var goalname = data["goalname"];
//           var refId = data["refId"];
//           var module = data["module"];
//           $('#select_goal').val(refId);
//           setModuleData(goalname, refId, module);
//         } else {
//           // doc.data() will be undefined in this case
//           console.log("No such document!");
//         }
//       })
//       .catch((error) => {
//         console.log("Error getting document:", error);
//       });
//   }
// }
// setselectoption()

//fetch select goal data
// function getGoalData(goalname,refId) {

//   const sfRef = db.collection(userId).doc('goals');

// }

//set module
// function setModuleData(goalname, refId, module) {
//     console.log(module)
//   $.each(module,function(key,val){
//     console.log(val)

//     $('#data_contain').append('<div class="row"><p>'+val+'</p><span class="edit_icon"><?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"> </span> </div>')
    
//   })

//   $('#data_contain').append('<div class="submit_btn">Submit</div>')
// }

//sliding up adding panel
$(".add_btn").click(function () {
  $(".add_modal").animate({ bottom: "0" }, "fast");
});
$(".close_add_modal").click(function () {
  $(".add_modal").animate({ bottom: "-100rem" }, "slow");
});

//get chapters data when user select there goal
$("#select_goal").change(function () {
  if ($("#select_goal").val() != "") {
    $(".add_btn").show();
    $("#data_contain").show();
  } else {
    $(".add_btn").hide();
    $("#data_contain").hide();
  }
});
