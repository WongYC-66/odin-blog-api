const asyncHandler = require("express-async-handler");
var jwt = require('jsonwebtoken')

const Post = require('../model/post')
const User = require('../model/user')

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
        .populate("user")
        .select("-password")
        .sort({ timestamp: -1 })
        .exec()

      res.json({
        message: 'getting all posts_list',
        allPosts,
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

      // missing update params
      if (!jsonData.title || !jsonData.contents || !jsonData.isPublished) {
        return res.json({
          error: "Missing API input params"
        })
      }

      const user = await User.findOne({ username: authData.user.username });
      // not an admin, denied
      if (!user.isAdmin) {
        return res.sendStatus(403)  // forbidden
      }


      let newPost = new Post({
        title: jsonData.title,
        contents: jsonData.contents,
        user: user,
        timestamp: new Date(),
        isPublished: jsonData.isPublished,
      })

      await newPost.save()

      res.json({
        message: 'post created successfully',
        newPost,
      })
    })
  })
]

// Get 1 post detail from postId
exports.posts_read_get = [

  verifyTokenExist,

  asyncHandler(async (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (err, authData) => {
      if (err) {
        return res.sendStatus(403)  // forbidden
      }

      try {

        let post = await Post.findById(req.params.postId)
          .populate("user")
          .select("-password")
          .exec()

        if (!post) {
          // post not found in database
          return res.sendStatus(409)
        }

        // read success
        res.json({
          message: `getting post by id : ${req.params.postId}`,
          post,
        })

      } catch {
        return res.json({
          error: "postId incorrect or error"
        })
      }

    })
  })
]

// Update 1 previous post
exports.posts_update_put = [

  verifyTokenExist,

  asyncHandler(async (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (err, authData) => {
      if (err) {
        return res.sendStatus(403)  // forbidden
      }

      let jsonData = req.body

      // missing update params
      if (!jsonData.title || !jsonData.contents || !jsonData.isPublished) {
        return res.json({
          error: "Missing API input params"
        })
      }

      const user = await User.findOne({ username: authData.user.username });
      // not an admin, denied
      if (!user.isAdmin) {
        return res.sendStatus(403)  // forbidden
      }

      let updatedPost = new Post({
        title: jsonData.title,
        contents: jsonData.contents,
        user: user,
        timestamp: new Date(),
        isPublished: jsonData.isPublished,
        _id: req.params.postId
      })


      try {
        const result = await Post.findByIdAndUpdate(req.params.postId, updatedPost, {});
        if (!result) {
          // post not found in database
          return res.sendStatus(409)
        }
      } catch {
        return res.json({
          error: "postId incorrect or error"
        })
      }

      // update success
      res.json({
        message: `updated post, id : ${req.params.postId}`,
        updatedPost,
      })

    })
  })
]
// Get 1 post
exports.posts_delete = [

  verifyTokenExist,

  asyncHandler(async (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_SECRET_KEY, async (err, authData) => {
      if (err) {
        return res.sendStatus(403)  // forbidden
      }

      const user = await User.findOne({ username: authData.user.username });
      // not an admin, denied
      if (!user.isAdmin) {
        return res.sendStatus(403)  // forbidden
      }

      try {
        const result = await Post.findByIdAndDelete(req.params.postId, {});
        if (!result) {
          // post not found in database
          return res.sendStatus(409)
        }
      } catch {
        return res.json({
          error: "postId incorrect or error"
        })
      }

      // deleted success
      res.json({
        message: `deleted post, id : ${req.params.postId}`,
      })

    })
  })
]
