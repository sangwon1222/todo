import * as express from "express";
import { Query } from "../util";

export default class Controller {
  static async initDB(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    let result = await Query(`
      # 태그 테이블
      DROP TABLE IF EXISTS hashTag; 
      CREATE TABLE hashTag (
        idx INT UNSIGNED AUTO_INCREMENT
        ,tagLabel VARCHAR(20) NOT NULL DEFAULT '' COMMENT '태그라벨'
        ,PRIMARY KEY (idx)
        ,UNIQUE (tagLabel)
        ,INDEX(tagLabel)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='해시태그 테이블';
    
      # 태그 사용정보
      DROP TABLE IF EXISTS hashTagUseInfo; 
      CREATE TABLE hashTagUseInfo (
        idx INT UNSIGNED AUTO_INCREMENT
        ,todoIDX INT UNSIGNED COMMENT '태그와 연결된 대상 IDX'
        ,tagIDX INT UNSIGNED COMMENT '연결 태그 IDX'
        ,PRIMARY KEY (idx)
        ,INDEX (todoIDX)
        ,INDEX (tagIDX)
        ,INDEX( todoIDX, tagIDX )
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='해시태그 대상 관계 테이블';
    `);
    if (result.error) {
      res.json({ ok: false, msg: result.error });
      return;
    }
    res.json({ ok: true, msg: "hashtag system api" });
  }

  // 태그 추가, 해당 사용대상의 IDX와 연결정보 생성
  static async add(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const param = req.body;
    param.todoIDX =
      typeof param.todoIDX == "string" ? +param.todoIDX : param.todoIDX;

    const tags = param.tags.split("#");
    for (const t of tags) {
      if (t.length > 0) {
        await this.addTag(t.trim(), param.todoIDX);
      }
    }
  }

  static async addTag(hashTag: string, useTargetIDX: number) {
    let tagIDX = -1;

    // 존재하는 태그면 등록하지 않는다.
    const query_add = await Query(
      `INSERT INTO hashTag (tagLabel) VALUES ('${hashTag}')`
    );
    if (query_add.error) {
      // 해당 태그가 존재하면, 존재하는 tag의 IDX를 가져온다
      if (query_add.error.code == "ER_DUP_ENTRY") {
        const query_getTagIDX = await Query(
          `SELECT idx FROM hashTag WHERE tagLabel='${hashTag}'`
        );
        if (query_getTagIDX.error) {
          console.log(query_getTagIDX.error);
          return;
        }
        tagIDX = query_getTagIDX.results[0].idx;
      }
    } else {
      tagIDX = query_add.results.insertId;
    }

    // 해당 태그를 사용대상과 연결한다.
    console.log("insert tagUseInfo:", useTargetIDX, tagIDX);
    const query_useInfo = await Query(`
      INSERT INTO hashTagUseInfo 
        (todoIDX,tagIDX) 
      SELECT ${useTargetIDX}, ${tagIDX} FROM dual
      WHERE NOT EXISTS(
        SELECT * FROM hashTagUseInfo
        WHERE todoIDX=${useTargetIDX} AND tagIDX=${tagIDX}
      );
    `);
    if (query_useInfo.error) {
      console.log(query_useInfo.error);
    }
  }

  // 대상 IDX로 사용된 태그 목록
  static async getTagList(useTargetIDX: number) {
    const query_list = await Query(`
      SELECT ht.tagLabel
      FROM hashTagUseInfo AS info
      LEFT JOIN hashTag AS ht 
        ON info.tagIDX=ht.idx
      WHERE info.todoIDX = ${useTargetIDX};
    `);
    if (query_list.error) {
      console.log(query_list.error);
    }
    return { ok: true, list: query_list.results.map((v: any) => v.tagLabel) };
  }
}
