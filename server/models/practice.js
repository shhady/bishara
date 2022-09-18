import mongoose from "mongoose";
import validator from "validator";

const practiceSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    videos: { type: String },
    reply: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Practice", practiceSchema);
