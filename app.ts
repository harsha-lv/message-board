import path from "node:path";
import { fileURLToPath } from "node:url";
import express, { type Application, type Request, type Response, type NextFunction } from "express";
import messageRouter from "./routes/messageRouter.ts";

const app: Application = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", messageRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).render("message", {
    title: "Page Not Found",
    error: `Route ${req.originalUrl} not found.`,
    selectedUser: null,
  });
});

// Centralized error handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error("Internal Server Error:", err);
  res.status(500).render("message", {
    title: "Server Error",
    error: "An unexpected error occurred. Please try again later.",
    selectedUser: null,
  });
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
