import * as express from "express";
import * as util from "../util";

export default class ListController {
  static async getTeamList(req: express.Request, res: express.Response) {
    const { teamId } = req.query;
    const query = teamId
      ? `
      SELECT * FROM teamList
      WHERE idx = ${teamId}
    `
      : `SELECT * FROM teamList`;
    const { results } = await util.Query(query);
    const ok = results.length > 0;
    res.json({ ok, result: results });
  }
}
