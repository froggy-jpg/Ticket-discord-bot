import { Client, GatewayIntentBits, Partials } from "discord.js";
import { initializeCommands } from "../infra/deployCommands.js";
export class DiscordBot {
    client;
    token = process.env.TOKEN;
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
    initializeEvent(event) {
        this.client.on(event.type, (...args) => event.execute(...args));
    }
    start() {
        this.client.login(this.token);
        initializeCommands();
    }
}
