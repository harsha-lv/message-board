import type { Request, Response, NextFunction } from "express";
import * as db from "../db/queries.ts";

export async function getMessages(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const messages = await db.getAllMessages();
    res.render("index", { title: "Mini Message Board", messages });
  } catch (error) {
    next(error);
  }
}

export function getNewMessageForm(req: Request, res: Response): void {
  res.render("form", { title: "New Message" });
}

export async function postNewMessage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const messageUser = req.body.messageUser?.trim();
    const messageText = req.body.messageText?.trim();
    const rawDate = req.body.messageDate;
    const messageDate = rawDate ? new Date(rawDate) : new Date();

    if (!messageUser || !messageText) {
      res.status(400).render("form", {
        title: "New Message",
        error: "Author and Message text are required.",
      });
      return;
    }

    await db.createMessage(messageUser, messageText, messageDate);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
}

export async function getMessageDetail(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const rawUrlUser = req.params.urlUser;
    const urlUser = Array.isArray(rawUrlUser) ? rawUrlUser[0] : rawUrlUser;
    const selectedUser = await db.getMessageByUser(urlUser);

    if (!selectedUser) {
      res.status(404).render("message", {
        title: "Message Not Found",
        error: `No message found for user "${urlUser}".`,
        selectedUser: null,
      });
      return;
    }

    res.render("message", {
      title: `${selectedUser.user}'s Message`,
      selectedUser,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMessageByIdDetail(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const rawId = req.params.id;
    const idString = Array.isArray(rawId) ? rawId[0] : rawId;
    const id = Number(idString);
    if (isNaN(id)) {
      res.status(400).send("Invalid message ID");
      return;
    }

    const message = await db.getMessageById(id);
    if (!message) {
      res.status(404).render("message", {
        title: "Message Not Found",
        error: `No message found with ID ${id}.`,
        selectedUser: null,
      });
      return;
    }

    res.render("message", {
      title: `${message.user}'s Message`,
      selectedUser: message,
    });
  } catch (error) {
    next(error);
  }
}
