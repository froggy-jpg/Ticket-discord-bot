import { Client, Events, GatewayIntentBits, MessageFlags } from "discord.js";

import { BUTTON_ROW, TICKET_ROW } from "./buttons.ts";
import { handleEvents } from "./buttonHandle.ts";
import { initializeCommands } from "./infra/deployCommands.ts";
import {
  TicketCommand,
  CreateMessageCommand,
  TicketMessageContent,
} from "./types/ticket.constants.ts";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.login(process.env.TOKEN);
initializeCommands();

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== TicketCommand.NAME) return;
  if (!interaction.guild) return;

  await interaction.deferReply({ flags: MessageFlags.Ephemeral });
  await interaction.followUp({
    content: TicketMessageContent.ACTIONS_PROMPT,
    components: [TICKET_ROW],
    flags: MessageFlags.Ephemeral,
  });
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName !== CreateMessageCommand.NAME) return;
  if (!interaction.channel?.isTextBased()) return;

  await interaction.deferReply({ flags: MessageFlags.Ephemeral });

  const messageInput = interaction.options.getString(
    CreateMessageCommand.INPUT_MESSAGE_NAME,
    true,
  );

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
});

handleEvents(client);
