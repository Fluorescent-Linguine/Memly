var mongodb = require('mongodb');
var mongoose = require('mongoose');
var crypto = require('crypto');
var mime = require('mime');
var mediaUpload = require('./aws/media');
var profileUpload = require('./aws/uploadProfilePhoto');
var Memly = require('./memly/model');

var mongooseUri =
  process.env.MONGODB_URI ||
  'mongodb://localhost/memly';

mongoose.connect(mongooseUri);

// Use 'Multer' middleware to take a photo and put it in a folder
// called 'uploads' so we can easily access it later
// Multer is middleware for handling 'multipart/form-data',
// which is primarily used for uploading files
// https://github.com/expressjs/multer
var multer = require('multer');

// We use the below storage attribute to assign our own
// file names rather than have multer assign some hexadecimal blabber
// http://stackoverflow.com/questions/32184589/renaming-an-uploaded-file-using-multer-doesnt-work-express-js
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  // Randomize file name using below code
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});
var upload = multer({ storage: storage });

// Call the below on app to enable it to upload images to database
module.exports = function(app) {

  app.post('/api/photo', upload.single('photo'), function(req, res) {
    console.log('--> Request File --> ', req.file);
    console.log('--> Request Body --> ', req.body);

    // 'mediaUpload' handles saving image file to Amazon Web Services S3 cloud
    // and also creates the memly model and saves the url to the AWS S3 image
    // to the model to be more easily retrieved later
    mediaUpload.create(req, res);
  });

  app.post('/user/edit/profilephoto', upload.single('photo'), function(req, res) {
    // console.log(' checking my request file------> ', req.file);
    //console.log('checking my request body-------> ', req.body);


    profileUpload.create(req, res);
  });

  app.get('/api/nearby', function(req, res) {
    // Acknowledge current user location
    console.log('url', req.url);
    console.log('getting api nearby');
    console.log(req.query.latitude, req.query.longitude);
    var userLocation = {
      latitude: parseFloat(req.query.latitude),
      longitude: parseFloat(req.query.longitude)
    };

    // Find any within 0.05 +/- lat and lng of current user location
    // which should equate to ~1.15 miles diameter circle centered on user

    var minLat = userLocation.latitude - 0.5;
    var maxLat = userLocation.latitude + 0.5;
    var minLng = userLocation.longitude - 0.5;
    var maxLng = userLocation.longitude + 0.5;

    console.log(minLat, maxLat, minLng, maxLng);
    // Query database for any memlys that are within range
    // http://mongoosejs.com/docs/queries.html
    Memly.find().where('location.latitude').gt(minLat).lt(maxLat)
    // .where('location.longitude').gt(minLng).lt(maxLng)
      // 'location.latitude': { $gt: minLat, $lt: maxLat },
      // 'location.longitude': { $gt: minLng, $lt: maxLng }
    .exec(function(err, memlys) {
      if (err) {
        console.log(err);
        return;
      }
      res.send(memlys);
    });
  });

};
