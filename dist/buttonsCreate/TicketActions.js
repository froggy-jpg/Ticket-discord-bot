import { MessageFlags } from "discord.js";
import { Event } from "../core/Event.js";
import { TicketCommand, TicketMessageContent, } from "../types/ticket.constants.js";
import { TICKET_ROW } from "../types/buttons.js";
export class TicketActions extends Event {
    bot;
    type = "interactionCreate";
    constructor(bot) {
        super();
        this.bot = bot;
    }
    async execute(interaction) {
        if (!interaction.isChatInputCommand())
            return;
        if (interaction.commandName !== TicketCommand.NAME)
            return;
        if (!interaction.guild)
            return;
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        await interaction.followUp({
            content: TicketMessageContent.ACTIONS_PROMPT,
            components: [TICKET_ROW],
            flags: MessageFlags.Ephemeral,
        });
    }
}
