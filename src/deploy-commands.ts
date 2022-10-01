import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import config from "./bot.config";

const commands = [];
const commandFiles = fs
  .readdirSync(path.resolve(__dirname, "commands"))
  .filter((file) => file.endsWith(".js"));

const clientId = config.CLIENT_ID;
const guildId = config.GUILD_ID;

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(config.TOKEN);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data: Array<any> = (await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    )) as Array<any>;

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
