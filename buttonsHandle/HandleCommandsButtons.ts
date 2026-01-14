import {
  ChannelType,
  Interaction,
  MessageFlags,
  PermissionFlagsBits,
} from "discord.js";
import { TicketReplies } from "../types/ticket.constants.js";
import { DiscordBot } from "../core/DiscordBot.js";
import { Event } from "../core/Event.js";

export class HandleCommandsButtons extends Event<"interactionCreate"> {
  type: "interactionCreate" = "interactionCreate";
  constructor(bot: DiscordBot) {
    super();
  }
  async execute(interaction: Interaction) {
    if (!interaction.isButton() || !interaction.guild) return;

    try {
      const userId = interaction.user.id;

      if (interaction.customId === "ticket_create") {
        await interaction.deferUpdate();

        const member = await interaction.guild.members
          .fetch(userId)
          .catch(() => null);
        if (!member) {
          await interaction.followUp({
            content: TicketReplies.NO_MEMBER,
            flags: MessageFlags.Ephemeral,
          });
          return;
        }

        if (member.roles.cache.has(process.env.APPROVE_ROLE_ID!)) {
          await interaction.followUp({
            content: TicketReplies.ALREADY_VERIFIED,
            flags: MessageFlags.Ephemeral,
          });
          return;
        }

        const existingTicket = interaction.guild.channels.cache.find(
          (c) =>
            c.type === ChannelType.GuildText &&
            c.name.startsWith("ticket-") &&
            c.topic === userId,
        );

        if (existingTicket) {
          await interaction.followUp({
            content: TicketReplies.TICKET_ALREADY_EXIST,
            flags: MessageFlags.Ephemeral,
          });
          return;
        }

        const ticketChannels = interaction.guild.channels.cache
          .filter((c) => c.name.startsWith("ticket-"))
          .map((c) => Number(c.name.split("-")[1]))
          .filter((n) => !isNaN(n));

        const nextNumber = ticketChannels.length
          ? Math.max(...ticketChannels) + 1
          : 1;

        const newChannel = await interaction.guild.channels.create({
          name: `ticket-${nextNumber}`,
          topic: userId,
          parent: process.env.TICKET_CATEGORY_ID,
          permissionOverwrites: [
            {
              id: interaction.guild.roles.everyone,
              deny: [PermissionFlagsBits.ViewChannel],
            },
            {
              id: userId,
              allow: [
                PermissionFlagsBits.ViewChannel,
                PermissionFlagsBits.SendMessages,
              ],
            },
          ],
        });

        if (newChannel) {
          await newChannel.send({
            content: TicketReplies.CHAT_RULES,
          });
        }
        return;
      }

      if (
        interaction.customId === "approve_ticket" ||
        interaction.customId === "reject_ticket"
      ) {
        await interaction.deferUpdate();

        const channel = interaction.channel;
        if (!channel || channel.type !== ChannelType.GuildText) {
          await interaction.followUp({
            content: TicketReplies.NOT_IN_TICKET_CHANNEL,
            flags: MessageFlags.Ephemeral,
          });
          return;
        }

        const ownerId = channel.topic;
        if (!ownerId) {
          await interaction.followUp({
            content: TicketReplies.CANT_DEFINE_OWNER_ID,
            flags: MessageFlags.Ephemeral,
          });
          return;
        }

        if (
          !interaction.memberPermissions?.has(
            PermissionFlagsBits.ManageChannels,
          )
        ) {
          await interaction.followUp({
            content: TicketReplies.NOT_ENOUGH_PERMISSIONS,
            flags: MessageFlags.Ephemeral,
          });
          return;
        }

        if (interaction.customId === "reject_ticket") {
          await channel
            .delete(TicketReplies.REJECTED_DELETE_REASON)
            .catch(() => null);
          return;
        }

        if (interaction.customId === "approve_ticket") {
          const member = await interaction.guild.members
            .fetch(ownerId)
            .catch(() => null);
          if (member) {
            await member.roles.add(process.env.APPROVE_ROLE_ID!);
          }
          await channel
            .delete(TicketReplies.APPROVED_DELETE_REASON)
            .catch(() => null);
          return;
        }
      }
    } catch (e) {
      console.log(e);
      if (interaction && !interaction.replied) {
        await interaction.followUp({
          content: TicketReplies.UNKNOWN_ERROR,
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  }
}
