import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import indexRouter from "./src/routes/index";
import usersRouter from "./src/routes/users";
import affirmRouter from "./src/routes/affirmation";
import todoRouter from "./src/routes/todo";

import { connectDB } from "./src/service/databse.service";

const app = express();

const port = 3001;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/affirmation", affirmRouter);
app.use("/todo", todoRouter);

connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true },
});

io.on("connection", (socket) => {
  console.log("client connected:", socket.id);
  socket.emit("notification", { type: "info", text: "Connected" });

  socket.on("disconnect", (reason) => {
    console.log("client disconnected:", socket.id, reason);
  });
});

// (optional)
app.post("/notify-all", (req, res) => {
  const payload = req.body ?? { type: "info", text: "Hello everyone!" };
  io.emit("notification", payload);
  res.json({ ok: true });
});

server.listen(port, () => {
  console.log(`Server + WS on http://localhost:${port}`);
});
