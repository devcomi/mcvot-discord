import {
  ChatInputCommandInteraction,
  Client,
  GuildMember,
  Interaction,
  User,
} from "discord.js";
import PendingUserClass from "./tables/pending_users.class";
import RoleClass from "./tables/role.class";
import UserClass from "./tables/user.class";

export type PVRowDataPacket = {
  UUID: string;
  PIN: string;
  DATE: number;
  //SERVER_ID: number;
};

export type PVRowDataPackets = [PVRowDataPacket];

export type RLRowDataPacket = {
  SERVER_ID: number;
  ROLE_ID: number;
};

export type RLRowDataPackets = [RLRowDataPacket];

export type USRowDataPacket = {
  UUID: string;
  DISCORD_ID: number;
  //SERVER_ID: number;
};

export type USRowDataPackets = [USRowDataPacket];

export type DataClasses = {
  UClass: UserClass;
  PClass: PendingUserClass;
  RClass: RoleClass;
};

export type execute = (
  client: Client,
  author: GuildMember,
  interaction: ChatInputCommandInteraction,
  dataClasses: DataClasses
) => void;
