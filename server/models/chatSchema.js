import mongoose from "mongoose";

// const partSchema = new mongoose.Schema(
//   {
//     text: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     _id: false,
//   }
// );

const historySchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "model"],
      required: true,
    },
    filename:{
      type:String,
      required:false,
    },
    text: {
      required: true,
      type: String,
    },
    media: {
      type: String,
      required: false,
    },
    mediatype: {
      type: String,
      required: false,
    },
  },
  {
    _id: false,
  }
);

const ChatSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    default: "New Chat",
  },
  history: [historySchema],
  createdAt: {
    default: Date.now,
    type: Date,
  },
});
const ChatModel = mongoose.model("Chat", ChatSchema);

export default ChatModel;
