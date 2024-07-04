const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt')

const User = require('../model/user')
// const passport = require('passport')

// Sign in with passport session authentication
exports.sign_in_post = asyncHandler(async (req, res, next) => {
  // todo
  res.json("logging in")
})
// exports.sign_in_post = passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/sign-in"
// })

// Handles User Sign Up Post Request, proceed to register into database
exports.sign_up_post = asyncHandler(async (req, res, next) => {
  // Extract the validation errors from a request.

  let jsonData = req.body

  let user = new User({
    username: jsonData.username,
    password: jsonData.password,
    isAdmin: false
  })

  // upgrade to admin if client provides admin code
  if (jsonData.adminCode === '123456')
    user.isAdmin = true

  // checking for erros :
  // 1. check if username been used
  let userExisted = await User.findOne({ username: user.username })
    .collation({ locale: "en", strength: 2 })
    .exec()
  if (userExisted) {
    return res.json({
      error: "Username been used"
    })
  }

  // 2. check if password match with confirm password
  if(jsonData.password != jsonData.confirmPassword){
    return res.json({
      error: "password doesn't match with confirm password"
    })
  }

  // no error, then encrypt user password and save to DB
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    // if err, do something
    if (err) return next(err)
    // otherwise, store hashedPassword in DB
    try {
      user.password = hashedPassword
      await user.save();
      return res.json({
        success : `sign up success with username ${user.username}`
      })
    } catch (err) {
      return next(err);
    }
  })
});


// log out
exports.sign_out_get = asyncHandler(async (req, res, next) => {
  // todo
  res.json("logging out")
  // req.logout((err) => {
  //   if (err) {
  //     return next(err);
  //   }
  //   res.redirect("/");
  // });
});
