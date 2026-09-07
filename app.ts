import express, { type Application, type Request, type Response } from "express"

const app: Application = express()

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




app.get("/new", (req: Request, res: Response) => {
  res.send("new")
})

const PORT = 3000;
app.listen(PORT, (error) => {
  if (error){
    throw error;
  }
  console.log("listening")
})