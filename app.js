 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDM27EGunfyP481tI53uK9uEdaA2t6iir8",
    authDomain: "fir-3sdk.firebaseapp.com",
    databaseURL: "https://fir-3sdk.firebaseio.com",
    storageBucket: "",
  };
  
// Use Firebase services : A Firebase App can use multiple Firebase services. Each service can be accessed from the firebase namespace:
// firebase.auth() - Authentication
// firebase.storage() - Storage
// firebase.database() - Realtime Database

// initializeApp
var mainApp = firebase.initializeApp(config);

// Main Reference
var mainRef = mainApp.database().ref("/");

// save data on MEMEBERS node
// mainRef.child("members").set({"name": "Usuf Qutubuddin"});

mainRef.child("members").child("-KIH5V1ZEwMxzaD93xBe'").set({"name": "Usuf"});
mainRef.child("members").child("-KIH5V1ezlA5oaL0x9ta").set({"name": "Qutubuddin"});

// getting members using child_added event
mainRef.child("members").on("child_added", function(snapshot) {
    // Do whatever
    console.log('Child Added Event: ', snapshot.key, snapshot.val());
});

// getting members using value event
mainRef.child("members").once("value", function(snapshot) {
    // Do whatever
    console.log('Value Event: ', snapshot.key, snapshot.val());
});

// multi path update -- START --
var uid = "Askjhw98hajah2982jx"

var postData = {
    author: "username",
    uid: uid,
    body: "body",
    title: "title",
    starCount: 0
};

// Get a key for a new Post.
var newPostKey = mainRef.child('posts').push().key;

// Write the new post's data simultaneously in the posts list and the user's post list.
var updates = {};
updates['/posts/' + newPostKey] = postData;
updates['/user-posts/' + uid + '/' + newPostKey] = postData;

mainRef.update(updates, function(err){
    if(err)
        console.log(err);
    else
        console.log('updated');    
});
// multi path update -- END --

