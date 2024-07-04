var express = require('express');
var router = express.Router();


/* GET all Posts. */
router.get('/', function(req, res, next) {
  // to do
  res.send('get all post');
});

/* POST 1 new post. */
router.post('/', function(req, res, next) {
  // to do
  res.send('posting new post');
});

/* GET one post. */
router.get('/:postId', function(req, res, next) {
  // to do
  res.send(`getting ${req.params.postId}`);
});

router.put('/:postId', function(req, res, next) {
  // to do
  res.send(`updating ${req.params.postId}`);
});

router.delete('/:postId', function(req, res, next) {
  // to do
  res.send(`deleting ${req.params.postId}`);
});

/*
get v1/posts/
post v1/posts/

get v1/posts/:postId
put v1/posts/:postId
delete v1/posts/:postId

get v1/posts/:postId/comments
post v1/posts/:postId/comments
put v1/posts/:postId/comments
delete v1/:postId/comments

posts v1/user-sign-in
posts v1/user-sign-up
*/

module.exports = router;
