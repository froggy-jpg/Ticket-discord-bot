import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Interaction,
  MessageFlags,
} from "discord.js";
import { DiscordBot } from "../core/DiscordBot.js";
import { Event } from "../core/Event.js";
import { RoleSetupCommand } from "../types/ticket.constants.js";
import {
  reactionRoleBinds,
  saveReactionRoles,
} from "../stores/roleSetup.store.js";

export class HandleRole extends Event<"interactionCreate"> {
  type: "interactionCreate" = "interactionCreate";

  constructor(private bot: DiscordBot) {
    super();
  }
  async execute(interaction: Interaction): Promise<void> {
    if (!interaction.guild) return;
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName !== RoleSetupCommand.NAME) return;
    const role = interaction.options.getRole(
      RoleSetupCommand.INPUT_ROLE_NAME,
      true,
    );
    const emojiInput = interaction.options.getString(
      RoleSetupCommand.INPUT_EMOJI_NAME,
      true,
    );
    const collection = interaction.options.getString(
      RoleSetupCommand.INPUT_COLLECTION_NAME,
      true,
    );
    if (!reactionRoleBinds[collection]) {
      reactionRoleBinds[collection] = {};
    }
    reactionRoleBinds[collection][emojiInput] = role.id;
    saveReactionRoles();
    await interaction.reply({
      content: `Role <@&${role.id}> bound to ${emojiInput} in collection: ${collection}`, //wtf is this c++ syntax
      flags: MessageFlags.Ephemeral,
    });
  }
}
