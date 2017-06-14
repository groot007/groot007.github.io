

$(document).on("click", "#fb", function(){
  var provider = new firebase.auth.FacebookAuthProvider();
  auth(provider);
});

$(document).on("click", "#gl", function(){
  var provider = new firebase.auth.GoogleAuthProvider();
  auth(provider)
})
$(document).on("click", "#gh", function(){
  var provider = new firebase.auth.GithubAuthProvider();
  auth(provider)
})


$(document).on("click", ".link-acount .fb", function(e){
  e.preventDefault();
  var provider = new firebase.auth.FacebookAuthProvider();
  linking(provider);
});

$(document).on("click", ".link-acount .gl", function(e){
  e.preventDefault();
   var provider = new firebase.auth.GoogleAuthProvider();
  linking(provider);
});

$(document).on("click", ".link-acount .gh", function(e){
  e.preventDefault();
  var provider = new firebase.auth.GithubAuthProvider();
  linking(provider);
});


var loggined = false;
$(document).on("click", "#out", function(e){
  e.preventDefault();
  console.log(firebase.auth());
  firebase.auth().signOut().then(function() {

    $(".profile-inf .name").text("");
    $(".profile-inf .user-photo").attr("src", "");
    $(".for-logined").addClass("hidden");
    $(".sign-in").removeClass("hidden");

  }).catch(function(error) {
    console.log("error sign out", error);
  });
})


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var userId = firebase.auth().currentUser.uid;
    var name = "";
    var starCountRef = firebase.database().ref("users/" + userId + "/animations/");
    starCountRef.on('value', function(snapshot) {

      for (var key in user.providerData){
        for (var innerKey in user.providerData[key]){
          if (innerKey == "providerId"){
            switch(user.providerData[key][innerKey]){
              case "facebook.com" :
                $(".link-acount .fb").addClass("hidden");

              break;
              case "google.com" :
                $(".link-acount .gl").addClass("hidden");
              break;
              case "github.com" :
                $(".link-acount .gh").addClass("hidden");
              break;
              default:
               return;
            }
          }

        }
      }

      var select = $("select#saved");
      if(snapshot.val()){
        for(var key in snapshot.val()){
          if(!select.find("option[value='" + key + "']").length){
            select.append("<option value=" + key  + ">"+ key + "</option>");
          }
        }
       select.niceSelect("update");
      }


      $(".for-logined").removeClass("hidden");
      $(".sign-in").addClass("hidden");
    });

    console.log("user sign in", user.displayName);
     $(".profile-inf .name").text(user.displayName || user.email);
    $(".profile-inf .user-photo").attr("src", user.providerData[0].photoURL);

  } else {
    $(".for-logined").addClass("hidden");
    $(".sign-in").removeClass("hidden");
    // No user is signed in.
    console.log("not sign in")
  }
});

function auth(provider){
    var er = false;
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;

      // The signed-in user info.
      var user = result.user;
      console.log(user);
      console.log($(".profile-inf .name"));
      $(".profile-inf .name").text(user.displayName || user.email);
      $(".profile-inf .user-photo").attr("src", user.photoUrl);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      console.log(error);
      er = true;
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var auth = firebase.auth();
      var credential = error.credential;
    });
}

function linking(provider){
    var auth = firebase.auth();
    auth.currentUser.linkWithPopup(provider).then(function(result) {
      // Accounts successfully linked.
      var credential = result.credential;
      var user = result.user;
      console.log(credential)
      switch(credential.providerId){
        case "facebook.com" :
          $(".link-acount .fb").addClass("hidden");
        break;
        case "google.com" :
          $(".link-acount .gl").addClass("hidden");
        break;
        case "github.com" :
          $(".link-acount .gh").addClass("hidden");
        break;
        default:
         return;
      }
    }).catch(function(error) {

      // ...
    });
}



var database = firebase.database();

$(document).on("click", ".save-btn", function(){
  var user = firebase.auth().currentUser;
  var value = $(".props-block").inputs("getValue");
  var animName = value.anim["animation-name"];
  firebase.database().ref('users/' + user.uid + '/animations/' +  animName).set(value);
})

$(document).on("click", "#saved+div li", function(){
  var $this = $(this)
  var value = $this.data("value");

  var userId = firebase.auth().currentUser.uid;
  firebase.database().ref('users/' + userId + '/animations/')
    .once('value').then(function(snapshot) {
      $(".props-block").inputs("setObj", snapshot.val()[value]);
  });
})
