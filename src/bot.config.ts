import dotenv from "dotenv";
dotenv.config();

const { TOKEN, CLIENT_ID, GUILD_ID, HOST, DATABASE, USER, PASSWORD } =
  process.env;

if (
  !TOKEN ||
  !CLIENT_ID ||
  !GUILD_ID ||
  !HOST ||
  !DATABASE ||
  !USER ||
  !PASSWORD
) {
  throw new Error("환경 변수가 비어 있습니다.");
}

const config: Record<string, string> = {
  CLIENT_ID,
  GUILD_ID,
  TOKEN,
  HOST,
  DATABASE,
  USER,
  PASSWORD,
};

export default config;
