import { Interaction, Message, MessageFlags, TextChannel } from "discord.js";
import { DiscordBot } from "../core/DiscordBot.js";
import { Event } from "../core/Event.js";
import {
  reactionRoleBinds,
  reactionRoleMessages,
  saveReactionRoles,
} from "../stores/roleSetup.store.js";
import {
  SendRoleMessageCommand,
  TicketReplies,
} from "../types/ticket.constants.js";

export class CreateMessageWithRoles extends Event<"interactionCreate"> {
  type: "interactionCreate" = "interactionCreate";

  constructor(private bot: DiscordBot) {
    super();
  }

  async execute(interaction: Interaction): Promise<void> {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName !== SendRoleMessageCommand.NAME) return;
    if (!interaction.guild) return;
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });
    const messageInput = interaction.options.getString(
      SendRoleMessageCommand.INPUT_MESSAGE_NAME,
      true,
    );
    const collection = interaction.options.getString(
      SendRoleMessageCommand.INPUT_COLLECTION_NAME,
      true,
    );
    const message = messageInput.replace(/\\n/g, "\n");

    const channel = interaction.channel;
    if (!channel || !channel.isTextBased()) return;

    const map = reactionRoleBinds[collection];
    if (!map || Object.keys(map).length === 0) {
      await interaction.reply({
        content: `Collection \`${collection}\` is empty!`,
        ephemeral: true,
      });
      return;
    }

    const msg = await (channel as TextChannel).send({ content: message });

    for (const emoji of Object.keys(map)) {
      try {
        await msg.react(emoji);
      } catch (err) {
        console.log(TicketReplies.INVALID_EMOJI, emoji);
      }
    }

    reactionRoleMessages[msg.id] = collection;
    saveReactionRoles();

    await interaction.editReply({
      content: `Created!`,
    });
  }
}
