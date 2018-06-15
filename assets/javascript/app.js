

    // function buildTable() {
   
    //     // for (i = 0; i < destination.length, tFrenquency.length, firstTime.length; i++) {

    //         $(".table").append("<table>");
    //         $(".table").append("<thead>");
    //         $(".table").append("<tr>");
    //         $(".table").append("<th>Train Name</th>");
    //         $(".table").append("<th>Destination</th>");
    //         $(".table").append("<th>Frequency(min)</th>");
    //         $(".table").append("<th>Next Arrival</th>");
    //         $(".table").append("<th>Minutes Away</th>");

    //         $(".table").append("</tr>");
    //         $(".table").append("</thead>");
            
    //         $(".table").append("<tbody>");


    //     }
    // buildTable();
    var config = {
        apiKey: "AIzaSyCQKiU2Rn5S0Fo1oT2XcH3VDPD2XgaxMag",
        authDomain: "trains-91b79.firebaseapp.com",
        databaseURL: "https://trains-91b79.firebaseio.com",
        storageBucket: "trains-91b79.appspot.com"
      };
  
      firebase.initializeApp(config);
  
      // Create a variable to reference the database
      var database = firebase.database();



$("#add-train").on("click", function(event) {
    event.preventDefault();


    var name =  $("#name-input").val()

    var destination = $("#destination-input").val();

    var tFrequency = $("#frequency-input").val();

    var firstTime = $("#first-train-input").val();


    console.log(destination);
    console.log(tFrequency);
    console.log(firstTime);

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    
    database.ref().set({
        name: name,
        destination: destination,
        firstTimeConverted: firstTimeConverted,
        diffTime: diffTime,
        tRemainder: tRemainder,
        tMinutesTillTrain: tMinutesTillTrain,
        nextTrain: nextTrain

    });

    database.ref().on("value", function(snapshot) {

        // Log everything that's coming out of snapshot
        console.log(snapshot.val());
        console.log(snapshot.val().firstTimeConverted);
        console.log(snapshot.val().diffTime);
        console.log(snapshot.val().tRemainder);
        console.log(snapshot.val().tMinutesTillTrain);
        console.log(snapshot.val().nextTrain);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().name);



  
        // Change the HTML to reflect
        $("#train-name").text(snapshot.val().name);
        $("#destination").text(snapshot.val().destination);
        $("#frequency").text(snapshot.val().tRemainder);
        $("#next-arrival").text(snapshot.val().nextTrain);
        $("#minutes-away").text(snapshot.val().tMinutesTillTrain);

  
        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });

    // $("tbody").append("<row>");


    
    




})

