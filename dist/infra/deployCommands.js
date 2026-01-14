import { PermissionFlagsBits, REST, Routes, SlashCommandBuilder, } from "discord.js";
import { CreateMessageCommand, RoleSetupCommand, SendRoleMessageCommand, TicketCommand, } from "../types/ticket.constants.js";
const commands = [
    new SlashCommandBuilder()
        .setName(TicketCommand.NAME)
        .setDescription(TicketCommand.DESCRIPTION)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    new SlashCommandBuilder()
        .setName(SendRoleMessageCommand.NAME)
        .setDescription(SendRoleMessageCommand.DESCRIPTION)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addStringOption((option) => option
        .setName(SendRoleMessageCommand.INPUT_MESSAGE_NAME)
        .setDescription(SendRoleMessageCommand.INPUT_MESSAGE_DESCRIPTION)
        .setRequired(true))
        .addStringOption((option) => option
        .setName(SendRoleMessageCommand.INPUT_COLLECTION_NAME)
        .setDescription(SendRoleMessageCommand.INPUT_COLLECTION_DESCRIPTION)
        .setRequired(true)),
    new SlashCommandBuilder()
        .setName(RoleSetupCommand.NAME)
        .setDescription(RoleSetupCommand.DESCRIPTION)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addRoleOption((option) => option
        .setName(RoleSetupCommand.INPUT_ROLE_NAME)
        .setDescription(RoleSetupCommand.INPUT_EMOJI_DESCRIPTION)
        .setRequired(true))
        .addStringOption((option) => option
        .setName(RoleSetupCommand.INPUT_EMOJI_NAME)
        .setDescription(RoleSetupCommand.INPUT_EMOJI_DESCRIPTION)
        .setRequired(true))
        .addStringOption((option) => option
        .setName(RoleSetupCommand.INPUT_COLLECTION_NAME)
        .setDescription(RoleSetupCommand.INPUT_COLLECTION_DESCRIPTION)
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
