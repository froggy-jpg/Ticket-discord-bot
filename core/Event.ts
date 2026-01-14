import { ClientEvents, Events, SlashCommandBuilder } from "discord.js";
import { DiscordBot } from "./DiscordBot";

export abstract class Event<K extends keyof ClientEvents = keyof ClientEvents> {
  abstract type: K;
  once = false;

  abstract execute(...args: any[]): Promise<void>;
}
