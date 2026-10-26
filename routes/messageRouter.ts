import { Router } from "express";
import * as messageController from "../controllers/messageController.ts";

const messageRouter = Router();

messageRouter.get("/", messageController.getMessages);
messageRouter.get("/new", messageController.getNewMessageForm);
messageRouter.post("/new", messageController.postNewMessage);
messageRouter.get("/messages/:id", messageController.getMessageByIdDetail);
messageRouter.get("/:urlUser", messageController.getMessageDetail);

export default messageRouter;
