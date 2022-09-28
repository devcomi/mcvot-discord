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
  interaction.reply({ content: "Pong!" });
}

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("퐁으로 답합니다.");
