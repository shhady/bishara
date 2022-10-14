import express from "express";
const router = express.Router();
import Comment from "../models/Comment.js";
router.post("/comments", (req, res) => {
  //   const course = new Course(req.body);
  const comment = new Comment({
    ...req.body,
  });
  try {
    comment.save();
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send(error);
  }
});
router.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find({}).sort({ createdAt: -1 });
    res.status(200).send(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/comments/:id", async (req, res) => {
  const reply = req.body.reply;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  console.log(reply);
  const replyUpdate = await Comment.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { replies: { reply, firstName, lastName } } }
  );
  await replyUpdate.save();
  // console.log(firstName);
  res.status(200).send(replyUpdate);
});

router.delete("/comments/:id", async (req, res) => {
  try {
    // const course = await Course.findByIdAndDelete(req.params.id);
    const course = await Comment.findOneAndDelete({
      _id: req.params.id,
    });
    if (!course) {
      return res.status(404).send();
    }
    res.send(course);
  } catch (error) {
    res.status(500).send(error);
  }
});
export default router;
