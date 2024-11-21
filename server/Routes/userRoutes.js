import {
  deleteUser,
  listUser,
  loginUser,
  registerUser,
  userDetails,
} from "../controllers/userController.js";
import express from "express";
import { authMiddleWare } from "../middleware/auth.js";
const router = express.Router();

router.get("/", authMiddleWare,userDetails).post("/register", registerUser).post("/login",loginUser).delete("/", deleteUser);

export default router;
