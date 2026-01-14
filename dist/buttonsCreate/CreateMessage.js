import { MessageFlags } from "discord.js";
import { Event } from "../core/Event.js";
import { BUTTON_ROW } from "../types/buttons.js";
import { CreateMessageCommand, TicketMessageContent, } from "../types/ticket.constants.js";
export class CreateMessage extends Event {
    bot;
    type = "interactionCreate";
    constructor(bot) {
        super();
        this.bot = bot;
    }
    async execute(interaction) {
        if (!interaction.isChatInputCommand())
            return;
        if (interaction.commandName !== CreateMessageCommand.NAME)
            return;
        if (!interaction.channel?.isTextBased())
            return;
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        const messageInput = interaction.options.getString(CreateMessageCommand.INPUT_MESSAGE_NAME, true);
        const message = messageInput.replace(/\\n/g, "\n");
        await interaction.editReply({
            content: TicketMessageContent.CREATED_REPLY,
            components: [BUTTON_ROW],
        });
        if (!interaction.channel.isDMBased()) {
            await interaction.channel.send({
                content: message,
                components: [BUTTON_ROW],
            });
        }
    }
}
