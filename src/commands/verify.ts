import {
  ChatInputCommandInteraction,
  Client,
  GuildMember,
  Role,
  SlashCommandBuilder,
} from "discord.js";
import etcConfig from "../etc.config";

import { DataClasses, RLRowDataPackets } from "../types";

export async function execute(
  client: Client,
  author: GuildMember,
  interaction: ChatInputCommandInteraction,
  dataClasses: DataClasses
) {
  const name = interaction.options.getString("이름", true);
  const pin = interaction.options.getInteger("핀", true);

  const pendingSelect = await dataClasses.PClass.selectFromName(name);

  if (pendingSelect == undefined) {
    interaction.reply({
      content: "마인크래프트 서버에서 인증 명령어를 입력하셨는지 확인해주세요!",
    });
    return;
  }

  if ((await dataClasses.UClass.select(pendingSelect[0].UUID)) != undefined) {
    interaction.reply({ content: "이미 인증을 완료하셨습니다!" });
    return;
  }

  if (pendingSelect[0].PIN != pin.toString()) {
    interaction.reply({ content: "핀이 일치하지 않습니다!" });
    return;
  }

  if (
    pendingSelect[0].DATE + etcConfig.EXPIRE_TIME <=
    new Date().getTime() / 1000
  ) {
    interaction.reply({
      content: "엄청난 타이밍으로 입력하셨군요! 하지만 만료되었습니다!",
    });
  }

  dataClasses.UClass.insert(pendingSelect[0].UUID, parseInt(author.id));
  dataClasses.PClass.del(pendingSelect[0].UUID);

  dataClasses.RClass.select(parseInt(interaction.guildId as string)).then(
    (id: RLRowDataPackets) => {
      if (id == undefined) return;
      if (id[0] == undefined) return;
      const role = author.guild.roles.cache.find((r) => parseInt(r.id) === id[0].ROLE_ID);
      author.roles.add([role as Role]);
    }
  );

  interaction.reply({
    content: "인증이 완료되었습니다!",
  });
}

export const data = new SlashCommandBuilder()
  .setName("verify")
  .setDescription("마인크래프트 계정으로 인증합니다.")
  .addStringOption((option) =>
    option
      .setName("이름")
      .setDescription("당신의 마인크래프트 닉네임을 입력하세요.")
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option
      .setName("핀")
      .setDescription("마인크래프트 서버에서 발급 받은 핀을 입력하세요.")
      .setRequired(true)
  );
