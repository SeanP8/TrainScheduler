//1. Initialize Firebase
//2. Create button for adding new destinations - then update the html + update the database
//3. Create way to retrieve passengers from the passenger database
//4. Create a way to calculate when the next train will arrive. Using difference between ....
//     Then use moment.js formatting to set departure time
//5. calculate ...

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyB116S2OIe2wNgvggc3umvvnheAB-QASNY",
    authDomain: "train-schedule-304aa.firebaseapp.com",
    databaseURL: "https://train-schedule-304aa.firebaseio.com",
    projectId: "train-schedule-304aa",
    storageBucket: "train-schedule-304aa.appspot.com",
    messagingSenderId: "518172400630"
  };
firebase.initializeApp(config);

var database = firebase.database();

// initial variables
var name = "";
var destination = "";
var firstTrain = "";
var frequency = "";

//2. Button for adding new info and send to firebase
$("#submit").on("click", function () {
    event.preventDefault();

    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#train1-time").val().trim();
    frequency = $("#frequency").val().trim();


    // Create local "temporary" object for holding passenger data
    // var newPass = {
    //     name: name,
    //     destination: destination,
    //     firstTrain: firstTrain,
    //     frequency: frequency,
    //     dateAdded: firebase.database.ServerValue.TIMESTAMP
    // }
    //Pushing the data to firebase
    firebase.database().ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    
    // Clears all of the text-boxes

    $("#train-name").val("");
    $("#destination").val("");
    $("#train1-time").val("");
    $("#frequency").val("");

});


// 3. Create firebase event for adding info from the database and a row in the html when a user adds an entry
firebase.database().ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    //grab data from firebase + log it
    var name = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency =childSnapshot.val().frequency;

    // Make the first train start look good
   // var firstTrainGood = moment.unix(firstTrain).format("MM/DD/YYYY");

    // calculate when the next train will arrive, relative to current time


    // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(name),
    $("<td>").text(destination),
    $("<td>").text(firstTrain),
    $("<td>").text(frequency)
  );

  $("#trainTable > tbody").append(newRow);
});