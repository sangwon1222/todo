import * as http from "http";
import express from "express";
import { initSocketIOServer } from "./socketIOServer";
import authRouter from "./routes/auth";
import todoRouter from "./routes/todo";
// import hashtagRouter from "./routes/hashtag";
import { specs, swaggerUi } from "./swagger";

import api from "./routes";
import cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
// https://kirkim.github.io/javascript/2021/10/16/body_parser.html
app.use(express.urlencoded({ extended: true }));

/**
 * @description client
 */
app.use("/", express.static("public"));

/**
 * @description route => api
 */
app.use("/api", api);
// app.use("/api", api);

/**
 * @description route => auth
 */
app.use("/api/auth", authRouter);
app.use("/api/todo", todoRouter);
// 해시태그 라우터 연동
// app.use("/hashtag", hashtagRouter);
// app.use("/api/list", ListRouter);

/**
 * @description api docs [swagger] 연동
 */
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const port = process.env.production ? 1222 || 1223 : 8000;
// const port = 8000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("todo_api");
});

app.use("*", express.static("public"));

const server = http.createServer(app);
// initSocketIOServer(server);

server.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});

console.log(process.env.NODE_ENV);
