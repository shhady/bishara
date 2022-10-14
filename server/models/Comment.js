import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
  userid: { type: String },
  courseId: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  comment: { type: String },
  replies: [{ type: Object }],
});

export default mongoose.model("Comment", CommentSchema);
