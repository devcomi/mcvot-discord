import {
  ChatInputCommandInteraction,
  Client,
  GuildMember,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";

import { DataClasses, RLRowDataPackets } from "../types";

export async function execute(
  client: Client,
  author: GuildMember,
  interaction: ChatInputCommandInteraction,
  dataClasses: DataClasses
) {
  if (!author.permissions.has(PermissionFlagsBits.Administrator)) {
    interaction.reply({
      content: "권한이 없습니다!",
    });
    return;
  }

  const role = interaction.options.getRole("역할", true);
  const guildRole = interaction.guild?.roles.cache.find(
    (r) => r.id === role.id
  );

  if (!guildRole?.editable) {
    interaction.reply("봇이 해당 역할을 설정 할 권한이 없습니다.");
  }

  await dataClasses.RClass.select(parseInt(interaction.guildId as string)).then(
    (id: RLRowDataPackets) => {
      if (id == undefined) return;
      if (id[0] == undefined) return;
      dataClasses.RClass.del(parseInt(interaction.guildId as string));
    }
  );

  dataClasses.RClass.insert(
    parseInt(interaction.guildId as string),
    parseInt(role.id)
  ).then(() => {
    interaction.reply({ content: "성공적으로 설정하였습니다!" });
  });
}

export const data = new SlashCommandBuilder()
  .setName("setrole")
  .setDescription("서버의 인증 역할을 정합니다.")
  .addRoleOption((option) =>
    option.setName("역할").setDescription("서버의 인증 역할.").setRequired(true)
  );
