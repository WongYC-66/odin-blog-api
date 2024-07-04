var express = require('express');
var router = express.Router({ mergeParams: true })

const comment_controller = require('../controllers/comment')


/* GET all comments for postId */
router.get('/', function(req, res, next) {
  // todo
  res.send(`getiing all comments for, ${req.params.postId}`);
});

/* Post one new comment for postId */
router.post('/', function(req, res, next) {
  // todo
  res.send(`posting new comment for, ${req.params.postId}`);
});

/* Update one new comment for postId */
router.put('/', function(req, res, next) {
  // todo
  res.send(`updating new comment for, ${req.params.postId}`);
});

/* Delete one new comment for postId */
router.delete('/', function(req, res, next) {
  // todo
  res.send(`deleting new comment for, ${req.params.postId}`);
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
