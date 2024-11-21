import ChatModel from "../models/chatSchema.js";
import userModel from "../models/userSchema.js";
import { updateUser } from "./userController.js";

const listChat = async (req, res) => {
  try {
    res.json({success:true,data:await ChatModel.find({userId:req.body.userId}).sort({ createdAt: -1 })});
  } catch (e) {
    res.json({success:false});
    console.log(e);
  }
};
const createChat = async (req, res) => {
  try {
    await ChatModel.deleteMany({userId:req.body.userId,history:{$size:0}})
    const newChat = await ChatModel.create({
      userId: req.body.userId,
      title: "New Chat",
      history: [],
    });
    res.send({ success: true, data: newChat });
    await updateUser(req.body.userId, newChat._id);
  } catch (e) {
    console.log(e);
    res.status(400).send({
      success: false,
      data: {
        history: [],
      },
    });
  }
};
const updateChat = async (req, res) => {
  try {
    await ChatModel.findByIdAndUpdate(
      req.body.chatId,
      { $push: { history: { $each: req.body.message } } },
      { new: true }
    );
    console.log(req.body);
    res.send("Added");
  } catch (e) {
    console.log(e);
    res.status(400).send("Error", e);
  }
};
const deleteChat = async (req, res) => {
  try {
    const chat = await ChatModel.findById(req.params.id);
    if (!chat) {
      return res.status(400).send("Not Deleted");
    }
    await ChatModel.findByIdAndDelete(req.params.id);
    await userModel.findByIdAndUpdate(
      chat.userId,
      { $pull: { chats: req.params.id } },
      { new: true }
    );
    res.send("Deleted");
  } catch (e) {
    console.log("Not deleted");
    res.status(400).send("Something Went wrong");
  }
};
const chatDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const chat = await ChatModel.findById(id);

    if (!chat) {
      return res.json({
        sucess: false,
        message: "Chat Not Found",
      });
    }else if(chat.userId!=req.body.userId){
      return res.json({
        success:false,
        message:"You're not authorized to this chat"
      })
    } 
    // console.log(chat);
    res.json({
      success: true,
      chat,
    });
  } catch (e) {
    console.log(e);
    res.send("Something Went wrong");
  }
};
const renameChat = async (req, res) => {
  try {
    const result = await ChatModel.findByIdAndUpdate(req.body.id, {
      $set: { title: req.body.title },
    });
    console.log(result);
    res.send("Renamed");
  } catch (e) {
    console.log(e);
    res.send("Something went wrong");
  }
};


export {
  listChat,
  createChat,
  updateChat,
  deleteChat,
  chatDetails,
  renameChat,
}; 