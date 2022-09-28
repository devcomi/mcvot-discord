import database from "../db";
import sql_class from "./sql.class";

export default class UserClass extends sql_class {
  constructor(name: string, parameter: { [key: string]: string }) {
    super(name, parameter);
  }

  insert(UUID: string, DISCORD_ID: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const name = this.tableName;
      const select = await this.select(UUID);

      if (select != undefined) return;

      database.query(
        `INSERT IGNORE INTO ${name} (UUID, DISCORD_ID) VALUES(?, ?)`,
        [UUID, DISCORD_ID],
        function (err, results) {
          if (err) reject(err);
          console.log(`성공적으로 ${name} 에 추가하였습니다! .. ${results[0]}`);
          resolve();
        }
      );
    });
  }

  select(data: any): Promise<any> {
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
