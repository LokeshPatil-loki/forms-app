import express, { Request, Response } from "express";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { userRouter } from "./routes/users.routes";

const app = express();
app.use(express.json());

// Route handler with explicit types for req and res
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.use("/auth", userRouter);

app.use(errorHandler);

export { app };
