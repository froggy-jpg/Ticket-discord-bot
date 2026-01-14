import { PermissionFlagsBits, REST, Routes, SlashCommandBuilder, } from "discord.js";
import { CreateMessageCommand, RoleSetupCommand, TicketCommand, } from "../types/ticket.constants.js";
const commands = [
    new SlashCommandBuilder()
        .setName(TicketCommand.NAME)
        .setDescription(TicketCommand.DESCRIPTION)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    new SlashCommandBuilder()
        .setName("sendrolemessage")
        .setDescription("Send role picker message, with corresponding binds. Do not forget to disable own roles in a channel")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addStringOption((option) => option
        .setName("message")
        .setDescription("Message to send")
        .setRequired(true))
        .addStringOption((option) => option
        .setName("collection")
        .setDescription("What collection do you want to use")
        .setRequired(true)),
    new SlashCommandBuilder()
        .setName(RoleSetupCommand.NAME)
        .setDescription(RoleSetupCommand.DESCRIPTION)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addRoleOption((option) => option.setName("role").setDescription("Role to give").setRequired(true))
        .addStringOption((option) => option
        .setName("emoji")
        .setDescription("Emoji for reaction")
        .setRequired(true))
        .addStringOption((option) => option
        .setName("collection")
        .setDescription("In what collection add this")
        .setRequired(true)),
    new SlashCommandBuilder()
        .setName(CreateMessageCommand.NAME)
        .setDescription(CreateMessageCommand.DESCRIPTION)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addStringOption((option) => option
        .setName(CreateMessageCommand.INPUT_MESSAGE_NAME)
        .setDescription(CreateMessageCommand.INPUT_MESSAGE_DESCRIPTION)
        .setRequired(true)),
].map((command) => command.toJSON());
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
export async function initializeCommands() {
    try {
        await rest.put(Routes.applicationGuildCommands(process.env.BOT_ID, process.env.SERVER_ID), { body: commands });
        console.log("Commands initialized!!");
    }
    catch (error) {
        console.error(error);
    }
}
