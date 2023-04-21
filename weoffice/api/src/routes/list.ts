import * as express from "express";
import ListController from "../controller/list";

const listRouter: express.Router = express.Router();

/**
 * @swagger
 * paths:
 *  /api/list/team/list:
 *    get:
 *      summary: "팀 항목"
 *      description: "팀 항목 가져오기"
 *      tags: [List]
 *      responses:
 *        "200":
 *          description: 리스트 가져오기 성공
 */
listRouter.get("/team/list", ListController.getTeamList);

export default listRouter;
