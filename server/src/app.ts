import express, { Request, Response } from "express";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { userRouter } from "./routes/users.routes";
import { requireAuth } from "./middlewares/require-auth.middleware";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | string; // You can replace `any` with the actual type of the user payload
    }
  }
}

const app = express();
app.use(express.json());

// Route handler with explicit types for req and res
app.get("/", requireAuth, (req: Request, res: Response) => {
  res.json(req.user);
});

app.use("/auth", userRouter);

app.use(errorHandler);

export { app };
