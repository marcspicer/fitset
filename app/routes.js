// require express
var express = require('express');
var path    = require('path');
var fs = require('fs');

// create our router object
var router = express.Router();

// export our router
module.exports = router;

// route for our homepage
router.get('/', function(req, res) {
  const activites = JSON.parse(fs.readFileSync(__dirname + '/../data/activities.json', 'utf8'))
    .filter(activity => activity.status == 'yes');
  const classes = JSON.parse(fs.readFileSync(__dirname + '/../data/classes.json', 'utf8'))
    .filter(activity_class => activity_class.IsAvailable && activites[1].name.toLowerCase() == activity_class.name.toLowerCase());
  
    res.render('pages/home', {
    activites,
    classes
  });
});

router.get('/get-class/:id', function(req, res){
  const activity_id = req.params.id;
  if(activity_id){
    res.json([{id: activity_id}]);
  }
});
