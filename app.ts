import path from "node:path"
import { fileURLToPath } from "node:url"
import express, { type Application, type Request, type Response } from "express"

const app: Application = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

const convertDateToString = (d: Date) => {
  return d.toLocaleString().split(", ")[0];
}

const messages = [
  {
    text: "Hi there!",
    user: "harsha",
    added: convertDateToString(new Date())
  },
  {
    text: "Hello World!",
    user: "vaibhav",
    added: convertDateToString(new Date())
  }
];

app.get("/", (req: Request, res: Response) => {
  res.render("index", { title: "message board", messages: messages, formLink: "/new"})
})

app.use(express.urlencoded({ extended: true }));

app.get("/new", (req: Request, res: Response) => {
  res.render("form")
})

app.post("/new", (req: Request, res: Response) => {
  const messageText = req.body.messageText;
  const messageUser = req.body.messageUser;
  const messageDate = req.body.messageDate;
  messages.push({text: messageText, user: messageUser, added: messageDate});
  res.redirect('/')
})

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error){
    throw error;
  }
  console.log("listening")
})
