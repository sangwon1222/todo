import * as express from "express";
import * as jwt from "jsonwebtoken";
import * as util from "../util";

export default class TodoController {
  /**
   * @param todo : string
   */
  static async addTodo(req: express.Request, res: express.Response) {
    const { todo, teamId } = req.body;
    const account = Number(req.headers.account);
    const date = await util.getCurrentTime();

    const { ok, result } = await util.getUserInfo(account);
    if (!ok) {
      res.json({
        ok,
        error: "글쓴이 계정 오류",
      });
      return;
    }
    const query = teamId
      ? `
    INSERT INTO
      teamTodoList
      (
        teamId,
        contents,
        creatorName,
        creatorId,
        createDate, 
        creatorTeamId
      )
    VALUES
      ( 
        '${+result.teamId}', 
        '${todo}',
        '${result.userName}',
        '${result.userId}',
        '${date}',
        '${+result.teamId}'
      )
    `
      : `
    INSERT INTO
      todoList
      (
        contents,
        creatorName,
        creatorId,
        createDate, 
        creatorTeamId
      )
    VALUES
      (  
        '${todo}',
        '${result.userName}',
        '${result.userId}',
        '${date}',
        '${+result.teamId}'
      )
    `;
    const db = await util.Query(query);
    res.json({
      ok: db.sqlMessage ? false : true,
      error: db.sqlMessage,
      code: db.code,
    });
  }

  /**
   * @param req body todo : string
   */
  static async getTodo(req: express.Request, res: express.Response) {
    const account = Number(req.headers.account);
    const { teamId } = req.query;
    const { result } = await util.getUserInfo(account);

    const query = teamId
      ? `
    SELECT * FROM
      teamTodoList
    WHERE 
      teamId = '${teamId}'
    `
      : `
    SELECT * FROM
      todoList
    WHERE 
        creatorId = '${result.userId}'
    `;
    const { error, results } = await util.Query(query);
    res.json({
      ok: !error,
      result: results,
    });
  }

  /**
   * @param req body todo : string
   */
  static async updateTodo(req: express.Request, res: express.Response) {
    const { idx, todo, status, teamId } = req.body;
    const account = Number(req.headers.account);
    const date = await util.getCurrentTime();

    const { result } = await util.getUserInfo(account);

    const table = teamId ? "teamTodoList" : "todoList";
    const query = todo
      ? `
    UPDATE 
      ${table}
    SET
      updaterId='${result.userId}',
      updaterName='${result.userName}',
      updaterTeamId='${result.teamId}',
      updateDate='${date}',
      contents= '${todo}'
    WHERE 
        idx = '${idx}'
    `
      : `
    UPDATE 
      ${table}
    SET
      updaterId='${result.userId}',
      updaterName='${result.userName}',
      updaterTeamId='${result.teamId}',
      updateDate='${date}',
      status= '${status}'
    WHERE 
        idx = '${idx}'
    `;
    const { error, results } = await util.Query(query);
    res.json({
      ok: !error,
      result: results,
      error: error,
    });
  }

  /**
   * @param req body todo : string
   */
  static async deleteTodo(req: express.Request, res: express.Response) {
    const { idx, teamId } = req.body;
    const table = teamId ? "teamTodoList" : "todoList";
    const { error, results } = await util.Query(`
        DELETE FROM 
          ${table}
        WHERE 
          idx= ${idx}
    `);
    res.json({
      ok: !error,
      result: results,
      error: error,
    });
  }
}
