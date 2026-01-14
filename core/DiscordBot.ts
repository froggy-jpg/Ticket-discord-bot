import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import { initializeCommands } from "../infra/deployCommands.js";
import { Event } from "./Event.js";

export class DiscordBot {
  public client: Client;

  private readonly token = process.env.TOKEN;
  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMembers,
      ],
      partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.User,
      ],
    });
  }
  initializeEvent(event: Event) {
    this.client.on(event.type, (...args) => event.execute(...args));
  }
  start() {
    this.client.login(this.token);
    initializeCommands();
  }
}
