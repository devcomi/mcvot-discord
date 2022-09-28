import config from "./db.config";
import mysql from "mysql";

const connection = mysql.createConnection({
  host: config.Host,
  database: config.Database,
  user: config.User,
  password: config.Password,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("성공적으로 데이터베이스에 접속했습니다");
});

export default connection;
