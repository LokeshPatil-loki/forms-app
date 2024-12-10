import express, { Request, Response } from "express";
import { errorHandler } from "./middlewares/error-handler.middleware";

const app = express();
const port = 3000;

// Route handler with explicit types for req and res
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.use(errorHandler);

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });
