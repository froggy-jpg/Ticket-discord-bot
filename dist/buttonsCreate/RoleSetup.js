import { ActionRowBuilder, MessageFlags, RoleSelectMenuBuilder, } from "discord.js";
import { Event } from "../core/Event.js";
import { RoleSetupCommand } from "../types/ticket.constants.js";
export class RoleSetup extends Event {
    bot;
    type = "interactionCreate";
    constructor(bot) {
        super();
        this.bot = bot;
    }
    async execute(interaction) {
        if (!interaction.isChatInputCommand())
            return;
        if (interaction.commandName !== RoleSetupCommand.NAME)
            return;
        if (!interaction.guild)
            return;
        await interaction.reply({
            content: "Apply your roles",
            components: [
                new ActionRowBuilder().addComponents(new RoleSelectMenuBuilder()
                    .setCustomId("setupRoles")
                    .setPlaceholder("Choose your roles")
                    .setMinValues(1)
                    .setMaxValues(15)),
            ],
            flags: MessageFlags.Ephemeral,
        });
    }
}
