import * as express from "express";
import Controller from "../controller/tag";

const hashtagRouter: express.Router = express.Router();

// log찍기
function logApi(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  console.log(
    `[${new Date().toLocaleString()}] ${req.originalUrl}`,
    req.body || req.params || req.query
  );
  next();
}

/**
 * @swagger
 * paths:
 *  /api/tag/test:
 *    post:
 *      summary: "test"
 *      description: "회원 로그인"
 *      tags: [Hashtag]
 *      requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *                properties:
 *                    id:
 *                      type: string
 *                      description: "사용자 id"
 *                      example: "lsw"
 *                    pw:
 *                      type: string
 *                      description: "사용자 패스워드"
 *                      example: "1234"
 *      responses:
 *        "200":
 *          description: 로그인 성공
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    ok:
 *                      type: boolean
 *                    code:
 *                      type: interger
 *                    message:
 *                      type: string
 *                    result:
 *                      type: object
 *                      example:
 *                          [
 *                            { "username": '', "accessToken": "", refreshToken: '', account:'' },
 *                          ]
 */
hashtagRouter.all("/", [logApi], Controller.initDB);

/**
 * @param tag: string - #으로 시작하는 태그문자열( 여러개가 올수있음)
 * @param todoIDX: number - 해시태그와 매칭되는 todo글의 고유키
 */
// hashtagRouter.post("/add", [logApi], Controller.add);

/**
 * @param todoIDX:number - 태그목록을 가져올 대상 고유키
 */
hashtagRouter.post(
  "/list",
  [logApi],
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const param = req.body;
    param.todoIDX =
      typeof param.todoIDX == "string" ? +param.todoIDX : param.todoIDX;

    res.json(await Controller.getTagList(param.todoIDX));
  }
);

export default hashtagRouter;
