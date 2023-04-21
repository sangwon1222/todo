import express from "express";
import * as mysql from "mysql";
import * as jwt from "jsonwebtoken";
import crypto from "crypto-js";

export const checkToken = (token: string) => {
  return jwt.decode(token);
};

export const getCurrentTime = async () => {
  const fullDate = new Date();
  const month = fullDate.getMonth() + 1;
  const date = fullDate.getDate();

  const year = fullDate.getFullYear();
  const formatMonth = `${month}`.length === 1 ? `0${month}` : month;
  const formatDate = `${date}`.length === 1 ? `0${date}` : date;

  const fd = `${year}-${formatMonth}-${formatDate}`;
  const h = fullDate.getHours() + 9;
  const m = fullDate.getMinutes();
  const time = `${h < 10 ? "0" + h : h}:${m < 10 ? "0" + m : m}`;
  return `${fd} ${time}`;
};

export const getUserInfo = async (userIdx: number) => {
  const { error, results, _fields } = await Query(`
    SELECT idx,userId, userName,teamId FROM
      auth
    WHERE
      idx='${userIdx}'
    `);
  const result =
    results?.length === 1
      ? { ok: true, result: results[0], error }
      : { ok: false, result: [], error };
  return result;
};

/**
 * @param id decode된 아이디
 * @param pw decode된 비밀번호
 * @returns -{ok: boolean, result: [], error:''}
 */
export const checkAccount = async (id: string, pw: string) => {
  const { error, results } = await Query(`
    SELECT idx , userId, userName , teamId FROM
        auth
    WHERE
        userId='${id}'
      AND
        password ='${pw}'
    `);

  const result =
    results?.length === 1
      ? { ok: true, result: results[0], error }
      : { ok: false, result: [], error };
  return result;
};

// /**
//  * @param string 인코딩할 문자열
//  * @returns 인코딩된 문자열
//  */
// export const getEncodedData = (data: string, secretKey?: string) => {
//   const secret = secretKey ?? "secret key";
//   return crypto.AES.encrypt(JSON.stringify(data), secret).toString();
// };

// /**
//  * @param string 디코딩할 문자열
//  * @returns 디코딩된 문자열
//  */
// export const getDecodedData = (data: string, secretKey?: string) => {
//   const secret = secretKey ?? "secret key";
//   const byte = crypto.AES.decrypt(data, secret);
//   const t = JSON.stringify(byte.toString(crypto.enc.Utf8));
//   const decode = JSON.parse(t);

//   return decode;
// };

/**
 * @description Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
 * @description 발생시 대처 : https://1mini2.tistory.com/88
 */
export const Query = (sqlString: string) => {
  return new Promise<any>((resolve, reject) => {
    const isDevMode = process.env.NODE_ENV == "production";
    const host = isDevMode ? "weoffice-mysql-1" : "weoffice.sonidlab.co.kr";
    const port = isDevMode ? 3306 : 3310;

    const connection = mysql.createConnection({
      host,
      port,
      user: "todo",
      password: "1234",
      database: "todo",
      multipleStatements: true,
    });

    connection.connect(function (err) {
      console.log("DBConnected!");
      if (err) {
        console.log("error when connecting to db:", err);
      }
    });

    connection.query(
      sqlString,
      function (error: mysql.MysqlError, results, fields) {
        resolve({ error, results, fields });
      }
    );
    connection.end();
  });
};
