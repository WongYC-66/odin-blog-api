const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

const Post = require('../model/post')
const Comment = require('../model/comment')

// GET list of all posts
exports.posts_lists = asyncHandler(async (req, res, next) => {

  res.json('getting all posts_list')
})

// POST 1 new post
exports.posts_create_post = asyncHandler(async (req, res, next) => {
  let jsonData = req.body

  // console.log(jsonData)
  let newPost = new Post({
    title: jsonData.title,
    contents: jsonData.contents,
    user: jsonData.user,
    timestamp: new Date(),
    isPublished: jsonData.isPublished,
  })

  await newPost.save()
  res.json(newPost);
})

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

