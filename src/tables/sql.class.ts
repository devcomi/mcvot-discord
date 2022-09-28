import database from "../db";

export default abstract class SQLClass {
  tableName: string;
  parameter: { [key: string]: string };

  constructor(tableName: string, parameter: { [key: string]: string }) {
    this.tableName = tableName;
    this.parameter = parameter;

    let param = [];

    for (const index in parameter) {
      param.push(index + " " + parameter[index]);
    }

    database.query(
      `CREATE TABLE IF NOT EXISTS ${tableName} (${param.join()}, PRIMARY KEY (${
        param[0].split(" ")[0]
      }))`
    );
  }

  abstract select(data: any): Promise<any>;

  selectAll(): Promise<[any] | undefined> {
    const name = this.tableName;
    const sql = `SELECT * FROM ${name}`;
    return new Promise((resolve, reject) => {
      database.query(sql, function (err, results) {
        if (err) reject(err);
        if (results.length <= 0) resolve(undefined);
        //reject(`제 생각에는 ${name} 쿼리 한 결과가 나오지 않은 것 같습니다.`);

        resolve(results);
      });
    });
  }

  abstract del(data: any): Promise<void>;
}
