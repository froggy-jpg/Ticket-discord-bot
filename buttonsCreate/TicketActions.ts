import { Interaction, MessageFlags } from "discord.js";
import { DiscordBot } from "../core/DiscordBot.js";
import { Event } from "../core/Event.js";
import {
  TicketCommand,
  TicketMessageContent,
} from "../types/ticket.constants.js";
import { TICKET_ROW } from "../types/buttons.js";

export class TicketActions extends Event<"interactionCreate"> {
  type: "interactionCreate" = "interactionCreate";
  constructor(private bot: DiscordBot) {
    super();
  }
  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName !== TicketCommand.NAME) return;
    if (!interaction.guild) return;

    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    await interaction.followUp({
      content: TicketMessageContent.ACTIONS_PROMPT,
      components: [TICKET_ROW],
      flags: MessageFlags.Ephemeral,
    });
  }
}
