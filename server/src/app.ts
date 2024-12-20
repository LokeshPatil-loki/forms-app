import express, { Request, Response } from "express";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { userRouter } from "./routes/users.routes";
import { requireAuth } from "./middlewares/require-auth.middleware";
import { JwtPayload } from "jsonwebtoken";
import { UserPayload } from "./types/user-payload";
import { formsRouter } from "./routes/forms.routes";
import { questionRouter } from "./routes/question.routes";
import { responseRouter } from "./routes/response.routes";
import cors from "cors";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload | UserPayload | string; // You can replace `any` with the actual type of the user payload
    }
  }
}

const app = express();
app.use(cors());
app.use(express.json());

// Route handler with explicit types for req and res
app.get("/", (req: Request, res: Response) => {
  res.send("Hello there!");
});

app.get("/forms/:formId", (req, res) => {
  res.redirect(`forms://forms/${req.params.formId}/response`);
});

app.use("/api/auth", userRouter);
app.use("/api/form", formsRouter);
app.use("/api/question", questionRouter);
app.use("/api/response", responseRouter);

app.use(errorHandler);

export { app };
