import express from "express";
import {
  createChat,
  deleteChat,
  listChat,
  updateChat,
  chatDetails,
  renameChat,
} from "../controllers/chatController.js";
import { authMiddleWare } from "../middleware/auth.js";
const router = express.Router();

router
  .get("/", authMiddleWare,listChat)
  .get("/:id",authMiddleWare, chatDetails)
  .post("/add",authMiddleWare, createChat)
  .post("/rename", renameChat)
  .put("/", updateChat)
  .delete("/:id", deleteChat);

export default router;
