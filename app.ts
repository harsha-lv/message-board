import path from "node:path"
import { fileURLToPath } from "node:url"
import express, { type Application, type Request, type Response } from "express"

const app: Application = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

const messages = [
  {
    text: "Hi there!",
    user: "harsha",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "vaibhav",
    added: new Date()
  }
];

app.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "message board", messages: messages, formLink: `http://localhost:${PORT}/new`})
})

app.get("/new", (req: Request, res: Response) => {
  res.render("form")
})

app.use(express.urlencoded({ extended: true }));

app.post("/new", (req: Request, res: Response) => {
  const messageText = req.body.messageText;
  const messageUser = req.body.messageUser;
  const messageDate = req.body.messageDate;
  messages.push({text: messageText, user: messageUser, added: messageDate});
  res.redirect("/");
})

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error){
    throw error;
  }
  console.log("listening")
})