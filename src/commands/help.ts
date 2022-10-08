import {
  ChatInputCommandInteraction,
  Client,
  GuildMember,
  SlashCommandBuilder,
} from "discord.js";

import { DataClasses } from "../types";

export async function execute(
  client: Client,
  author: GuildMember,
  interaction: ChatInputCommandInteraction,
  dataClasses: DataClasses
) {
  interaction.reply({ content: "공식 인증 서버는 tellkraft.tk 입니다." });
}

export const data = new SlashCommandBuilder()
  .setName("help")
  .setDescription("도움!");
