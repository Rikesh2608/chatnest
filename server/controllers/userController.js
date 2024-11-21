import userModel from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password should be more than 8 Characters",
      });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Account Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const user = await userModel({ ...req.body, password: hashedPass });
    const userDetails = await user.save();

    const token = createToken(userDetails._id);

    res.json({ success: true, message: "Login Successfull", token });
  } catch (err) {
    res.status(400).send({ success: false, message: "Something went wrong" });
    console.log(err);
  }
};

const listUser = async (req, res) => {
  try {
    const user = await userModel.find().populate("chats");
    console.log(user);
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(401).send("Something wrong");
  }
};

const userDetails = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    res.json(
      user
        ? { success: true, username: user.username, email: user.email }
        : { username: "username", success: true, email: "Not registered" }
    );
  } catch (e) {
    res.json({ success:false,username: "username", email: "Not registered" });
    console.log(e);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Email not Exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Incorrect Password" });
    }
    res.json({
      success: true,
      message: "Login Successful",
      token: createToken(user._id),
    });
  } catch (e) {
    res.json({ success: false, message: "Something went wrong" });
    console.log(e);
  }
};

const updateUser = async (userId, chatId) => {
  try {
    await userModel.findByIdAndUpdate(
      userId,
      { $push: { chats: chatId } },
      { new: true, useFindAndModify: false }
    );
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    await userModel.deleteMany();
    res.send("Deleted All Users");
  } catch (err) {
    console.log(err);
    res.send("Not Deleted");
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, "random#secret");
};

export {
  registerUser,
  listUser,
  deleteUser,
  updateUser,
  loginUser,
  userDetails,
};
