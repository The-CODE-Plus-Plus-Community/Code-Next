import express from "express";
import cors from "cors";
import morgan from "morgan";

import BlogRoute from "./controllers/blog";
import UserRoute from "./controllers/user";

const PORT = process.env.PORT || 8000;
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// route handlers
app.use('/blogs', BlogRoute);
app.use('/user', UserRoute);

// app listens at
app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log('listening at port:', PORT);
});
