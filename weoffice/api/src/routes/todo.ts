import * as express from "express";
import TodoController from "../controller/todo";

const todoRouter: express.Router = express.Router();

/**
 * @swagger
 * paths:
 *  /api/todo/add:
 *  post:
 *      summary: '투두 추가'
 */
todoRouter.post("/add", TodoController.addTodo);

/**
 * @swagger
 * paths:
 *  /api/todo/get:
 *  post:
 *      summary: '투두 항목 조회'
 */
todoRouter.get("/get", TodoController.getTodo);

/**
 * @swagger
 * paths:
 *  /api/todo/update:
 *  post:
 *      summary: '투두 수정'
 */
todoRouter.post("/update", TodoController.updateTodo);

/**
 * @swagger
 * paths:
 *  /api/todo/delete:
 *  post:
 *      summary: '투두 삭제'
 */
todoRouter.post("/delete", TodoController.deleteTodo);

export default todoRouter;
