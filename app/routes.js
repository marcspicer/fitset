// require express
var express = require('express');
var path    = require('path');
var fs = require('fs');
// var Activity = require('./models/activity');

// create our router object
var router = express.Router();

// export our router
module.exports = router;

// route for our homepage
router.get('/', function(req, res) {
  // const activites = Activity.find({}, function(err, res){
  //   console.log('ACT:', res);
  // });
  
    res.render('pages/home');
});

router.get('/get-class/:id', function(req, res){
  const activity_id = req.params.id;
  if(activity_id){
    res.json([{id: activity_id}]);
  }
});
