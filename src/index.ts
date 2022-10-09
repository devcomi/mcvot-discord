//TODO: 비동기 추가 + Promise

import {
  ActivityType,
  ChatInputCommandInteraction,
  Client,
  GatewayIntentBits,
  GuildMember,
  Interaction,
  PermissionFlagsBits,
  Role,
  User,
} from "discord.js";
import fs from "fs";
import path from "path";
import config from "./bot.config";
import etc_Conf from "./etc.config";
// import users from "./tables/users";
// import pendingVerify from "./tables/pendingVerify";

import UserClass from "./tables/user.class";
import PendingUserClass from "./tables/pending_users.class";

import { execute, PVRowDataPackets, RLRowDataPackets } from "./types";
import RoleClass from "./tables/role.class";

let UClass: UserClass;
let PClass: PendingUserClass;
let RClass: RoleClass;

const commandPath = path.resolve(__dirname, "commands");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const commands: Map<
  string,
  {
    execute: execute;
  }
> = new Map();

fs.readdir(commandPath, (err, files) => {
  if (err) throw err;

  let jsfile = files.filter((file) => file.endsWith(".js"));
  if (jsfile.length <= 0) {
    console.log("명령어를 찾을 수 없습니다.");
    return;
  }

  jsfile.forEach((file, index) => {
    let command = require(`./commands/${file}`);
    console.log(`${file} 로드!`);
    commands.set(file.split(".")[0], command);
  });
});

client.once("ready", () => {
  client.user?.setPresence({
    activities: [
      {
        name: "Minecraft",
        type: ActivityType.Playing,
      },
    ],
  });

  UClass = new UserClass("users", {
    UUID: "VARCHAR(100)",
    DISCORD_ID: "BIGINT(100)",
    //SERVER_ID: "BIGINT(100)",
  });

  PClass = new PendingUserClass("pending_verify", {
    UUID: "VARCHAR(100)",
    NAME: "VARCHAR(20)",
    PIN: "VARCHAR(7)",
    DATE: "INT(100)",
    //SERVER_ID: "BIGINT(100)",
  });

  RClass = new RoleClass("roles", {
    SERVER_ID: "BIGINT(100)",
    ROLE_ID: "BIGINT(100)",
  });

  setInterval(async () => {
    const all = (await PClass.selectAll()) as unknown as PVRowDataPackets;

    if (all == undefined) {
      return;
    }

    for (const data of all) {
      if (data.DATE + etc_Conf.EXPIRE_TIME <= new Date().getTime() / 1000) {
        PClass.del(data.UUID);
      }
    }
  }, etc_Conf.TIMEOUT);

  console.log("I'm ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  if (!interaction.inGuild()) return;

  let commandfile = commands.get(interaction.commandName);
  if (commandfile) {
    commandfile.execute(
      client,
      interaction.member as GuildMember,
      interaction as ChatInputCommandInteraction,
      { UClass, PClass, RClass}
    );
  } else {
    interaction.reply("명령어를 찾을 수 없습니다!");
  }
});

client.on("guildMemberAdd", async (member) => {
  if (
    (await UClass.selectFromDiscordId(parseInt(member.user.id))) != undefined
  ) {
    RClass.select(parseInt(member.guild.id)).then((id: RLRowDataPackets) => {
      if (id == undefined) return;
      if (id[0] == undefined) return;
      const role = member.guild.roles.cache.find(
        (r) => parseInt(r.id) === id[0].ROLE_ID
      );
      if (role?.editable) {
        member.roles.add([role as Role]);
      }
    });
  }
});

client.login(config.TOKEN);
