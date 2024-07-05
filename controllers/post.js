const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
var jwt = require('jsonwebtoken')

const Post = require('../model/post')
const User = require('../model/user')
const Comment = require('../model/comment')

const verifyTokenExist = require('../controllers/jwt').verifyTokenExist

// GET list of all posts
exports.posts_lists = [

  verifyTokenExist,

  asyncHandler(async (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (err, authData) => {
      if (err) {
        return res.sendStatus(403)  // forbidden
      }

      let allPosts = await Post.find()
        .sort({timestamp: -1})
        .exec()

      res.json({
        message: 'getting all posts_list',
        allPosts,
        authData,
        timestamp: new Date(),
      })
    })
  })
]

// POST 1 new post
exports.posts_create_post = [

  verifyTokenExist,

  asyncHandler(async (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (err, authData) => {
      if (err) {
        return res.sendStatus(403)  // forbidden
      }

      let jsonData = req.body

      const user = await User.findOne({ username: jsonData.username });

      let newPost = new Post({
        title: jsonData.title,
        contents: jsonData.contents,
        user: user,
        timestamp: new Date(),
        isPublished: jsonData.isPublished,
      })

      await newPost.save()
      res.json(newPost);
    })
  })
]

// Get 1 post detail from postId
exports.posts_read_get = asyncHandler(async (req, res, next) => {
  res.send(`getting ${req.params.postId}`);
})

// Update 1 previous post
exports.posts_update_put = asyncHandler(async (req, res, next) => {
  res.send(`updating ${req.params.postId}`);
})

// Get 1 post
exports.posts_delete = asyncHandler(async (req, res, next) => {
  res.send(`deleting ${req.params.postId}`);
})

