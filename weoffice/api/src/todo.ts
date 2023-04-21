// import * as express from "express";
// import * as util from "./util";
// import * as jwt from "jsonwebtoken";

// export const TodoRouter: express.Router = express.Router();

// function jwtCheck(
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) {
//   const token = req.headers.authorization?.substring(7) as string;
//   const { account } = req.headers;
//   const decodeToken = util.checkToken(token) && account;
//   if (decodeToken) {
//     next();
//   } else {
//     res.status(400);
//     res.json({ ok: false, error: "token error" });
//   }
// }

// //*** GET
// TodoRouter.get(
//   "/user/list",
//   [jwtCheck],
//   async (req: express.Request, res: express.Response) => {
//     const { account } = req.headers;
//     try {
//       const todo = await util.Query(`
//         SELECT
//           creatorTeamId,
//           userTodo.idx,
//           creatorName,
//           createDate,
//           updateDate,
//           updateUser,
//           auth.idx,
//           userName,
//           userId,
//           content,
//           status
//         FROM auth
//         RIGHT OUTER
//         JOIN userTodo ON
//           userTodo.creatorName= auth.userName
//         WHERE
//           auth.idx = ${account}
//       `);
//       res.json({ ok: true, result: todo, errorMsg: "" });
//     } catch (e) {
//       res.json({ ok: false, result: [], errorMsg: `${e}` });
//     }
//   }
// );
// TodoRouter.get(
//   "/team/list",
//   [jwtCheck],
//   async (req: express.Request, res: express.Response) => {
//     const { teamId } = req.query;
//     try {
//       //   const todo = await util.Query(`
//       //   SELECT
//       //     *
//       //   FROM
//       //     auth
//       //   RIGHT OUTER
//       //   JOIN teamTodo ON
//       //     teamTodo.creatorName = auth.userName
//       //   WHERE
//       //     teamTodo.creatorTeamId = ${teamId}
//       // `);
//       const todo = await util.Query(`
//       SELECT *FROM
//         teamTodo
//       WHERE
//         teamTodo.creatorTeamId = ${teamId}
//     `);
//       res.json({ ok: true, result: todo, errorMsg: "" });
//     } catch (e) {
//       console.log(e);
//       res.json({ ok: false, result: [], errorMsg: `${e}` });
//     }
//   }
// );

// //*** ADD
// TodoRouter.post(
//   "/user/add",
//   async (req: express.Request, res: express.Response) => {
//     const { todo } = req.body;
//     const account = req.headers.account;
//     const date = util.getCurrentTime();
//     const user = await util.getUserInfo(`${account}`);

//     if (user) {
//       const data = await util.Query(`
//         INSERT INTO
//           userTodo
//           (creatorName , content , status, createDate , creatorTeamId)
//         VALUES
//           ('${user.userName}' , '${todo}' ,'0', '${date}','${user.teamId}')
//         `);
//       res.json({
//         ok: true,
//         result: data,
//         errorMsg: "",
//       });
//     } else {
//       res.json({
//         ok: false,
//         result: [],
//         errorMsg: "글쓴이의 아이디가 조회되지 않습니다.",
//       });
//     }
//   }
// );

// TodoRouter.post(
//   "/team/add",
//   async (req: express.Request, res: express.Response) => {
//     const { todo } = req.body;
//     const account = req.headers.account;
//     const date = await util.getCurrentTime();

//     const user = await util.getUserInfo(`${account}`);
//     if (user) {
//       const data = await util.Query(`
//         INSERT INTO
//           teamTodo
//           (creatorName , content , status, createDate , creatorTeamId)
//         VALUES
//           ('${user.userName}' , '${todo}' ,'0', '${date}', '${user.teamId}')
//       `);
//       res.json({ ok: true, result: data, errorMsg: "" });
//     } else {
//       res.json({
//         ok: false,
//         result: [],
//         errorMsg: "글쓴이의 아이디가 조회되지 않습니다.",
//       });
//     }
//   }
// );

// //*** UPDATE TODO */
// TodoRouter.post(
//   "/update/todo",
//   async (req: express.Request, res: express.Response) => {
//     const account = req.headers.account;
//     const { idx, todo } = req.body;
//     const date = await util.getCurrentTime();

//     const query = `
//         UPDATE userTodo
//         SET
//             content = '${todo}',
//             updateDate = '${date}',
//             updateUser='${account}'
//         WHERE
//             idx='${idx}'
//     `;
//     const tableData = await util.Query(query);
//     return res.json({ ok: true, result: tableData, errorMsg: "" });
//   }
// );
// //*** UPDATE STATUS */
// TodoRouter.post(
//   "/update/user/status",
//   async (req: express.Request, res: express.Response) => {
//     const { idx, updateUser, status } = req.body;
//     const date = await util.getCurrentTime();

//     try {
//       const query = `
//             UPDATE userTodo
//             SET
//                 status = '${status}',
//                 updateDate = '${date}',
//                 updateUser='${updateUser}'
//             WHERE
//             idx = '${idx}'
//         `;
//       await util.Query(query);
//       return res.json({ ok: true, errorMsg: "" });
//     } catch (e) {
//       console.log(e);
//       return res.json({ ok: false, errorMsg: "업데이트에 실패했습니다." });
//     }
//   }
// );

// TodoRouter.post(
//   "/update/team/status",
//   async (req: express.Request, res: express.Response) => {
//     const { idx, updateUser, status } = req.body;
//     const date = await util.getCurrentTime();

//     try {
//       const query = `
//             UPDATE teamTodo
//             SET
//                 status = '${status}',
//                 updateDate = '${date}',
//                 updateUser='${updateUser}'
//             WHERE
//             idx = '${idx}'
//         `;
//       await util.Query(query);
//       return res.json({ ok: true, errorMsg: "" });
//     } catch (e) {
//       return res.json({ ok: false, errorMsg: "삭제 실패했습니다." });
//     }
//   }
// );

// //*** DELETE
// TodoRouter.post(
//   "/user/delete",
//   async (req: express.Request, res: express.Response) => {
//     try {
//       await util.Query(`
//               DELETE
//               FROM userTodo
//               WHERE idx= ${req.body.idx}
//           `);
//       return res.json({ ok: true, errorMsg: "" });
//     } catch (e) {
//       return res.json({ ok: false, errorMsg: "삭제 실패했습니다." });
//     }
//   }
// );

// TodoRouter.post(
//   "/team/delete",
//   async (req: express.Request, res: express.Response) => {
//     try {
//       await util.Query(`
//               DELETE
//               FROM teamTodo
//               WHERE idx= ${req.body.idx}
//           `);
//       return res.json({ ok: true, errorMsg: "" });
//     } catch (e) {
//       return res.json({ ok: false, errorMsg: `${e}` });
//     }
//   }
// );
