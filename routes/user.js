var express = require('express');
var router = express.Router();


/* POST user sign in. */
router.post('/sign-in', function(req, res, next) {
  // to do
  res.send('sign in');
});

/* POST user sign up. */
router.post('/sign-up', function(req, res, next) {
  // to do
  res.send('sign up');
});

module.exports = router;
