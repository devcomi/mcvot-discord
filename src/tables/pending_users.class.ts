import database from "../db";
import sql_class from "./sql.class";

import { PVRowDataPackets } from "../types";

export default class PendingUserClass extends sql_class {
  constructor(name: string, parameter: { [key: string]: string }) {
    super(name, parameter);
  }

  select(data: any): Promise<PVRowDataPackets | undefined> {
    const name = this.tableName;
    return new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM ${name} WHERE UUID=?`,
        [data],
        function (err, results) {
          if (err) reject(err);
          if (results == undefined) resolve(undefined);
          if (results.length <= 0) resolve(undefined);
          resolve(results);
        }
      );
    });
  }

  selectFromName(data: string): Promise<PVRowDataPackets | undefined> {
    const name = this.tableName;
    return new Promise((resolve, reject) => {
      database.query(
        `SELECT * FROM ${name} WHERE NAME=?`,
        [data],
        function (err, results) {
          if (err) reject(err);
          if (results == undefined) resolve(undefined);
          if (results.length <= 0) resolve(undefined);
          resolve(results);
        }
      );
    });
  }

  del(data: any): Promise<void> {
    const name = this.tableName;

    return new Promise(async (resolve, reject) => {
      const select = await this.select(data);

      if (select == undefined) return;

      database.query(
        `DELETE FROM ${name} WHERE UUID=?`,
        [data],
        function (err, results) {
          if (err) reject(err);
          console.log(
            `성공적으로 ${name} 에서 ${data} 와 관련된 항목을 삭제하였습니다.`
          );
          resolve();
        }
      );
    });
  }
}
