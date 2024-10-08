const mongoose = require("mongoose");
const date = require('date-and-time');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User"},
  postId: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

// Virtual for MessageSchema's date-and-time
CommentSchema.virtual("datetime").get(function () {
  // We don't use an arrow function as we'll need the this object
  return date.format(this.timestamp, 'HH:mm:ss, YYYY/MM/DD'); 
});


// Export model
module.exports = mongoose.model("Comment", CommentSchema);