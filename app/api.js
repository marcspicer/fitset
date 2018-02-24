// require express
var express = require('express');
var path    = require('path');
var fs = require('fs');
var Activity = require('./models/activity');
var Location = require('./models/location');

// create our router object
var router = express.Router();

// export our router
module.exports = router;

// route for our homepage
router.get('/get-activities', function(req, res) {
  Activity.find({ status: true }, function(err, results){
    if(err){
        res.status(400).json(err);
    }  
    res.status(200).json(results);
  });
  
});

router.get('/get-locations/:category_id', function(req, res) {
    const category_id = req.params.category_id;
    var search = [];
    search.push(category_id); 
    Location.find({ categories: {$in: search} }, function(err, results){
      if(err){
          res.status(400).json(err);
      }  
      res.status(200).json(results);
    });
    
});



