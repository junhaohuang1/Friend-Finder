//gets access to friends.js
var friendsData = require("../data/friends");

//import friendsData
module.exports = function(app) {
  
  //sets the get route for /api/friends
  app.get("/api/friends", function(req, res) {
    res.json(friendsData);
  });


  //initialize empty arrays to hold data
  var differenceArray = [];
  var scoresArray = [];


  //sets the post route for /api/friends
  app.post("/api/friends", function(req, res) {
    
    //pushes user information into friendsData
    friendsData.push(req.body);
    var surveyArray = req.body.surveyResults;

    //resets scoresArray;
    scoresArray = []; 

    //get all data from friendsData
    for(var i = 0; i < friendsData.length-1; i++){

      //setting a variable to handle the array the loop is currently on
      var currentArray = friendsData[i].surveyResults;

      //resets differenceArray;
      differenceArray = [];

      //gets difference of each question between the user and current array
      for(var n = 0; n < currentArray.length; n++){
        var difference = surveyArray[n] - currentArray[n];
        differenceArray.push(Math.abs(difference));

      }

   
      //function to add the values in the difference array.  The sum of the difference array is the match score.
      var scoreTotal = differenceArray.reduce(function(a ,b){
        return a+b;

      });
      scoresArray.push(scoreTotal);
      
      
    }

    var index = 0;
    var value = scoresArray[0];

    //find min in the scoreArray
    for (var m = 1; m < scoresArray.length; m++){
      if (scoresArray[m] < value) {
        value = scoreTotal[m];
        index = m;
      }
    }
    // return friendData with the min index
    res.json(friendsData[index]);

  });

};
