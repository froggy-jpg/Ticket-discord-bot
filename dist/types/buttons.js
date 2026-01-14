import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";
import { TicketButtonLabels } from "./ticket.constants.js";
const createButton = new ButtonBuilder()
    .setCustomId("ticket_create")
    .setLabel(TicketButtonLabels.CREATE)
    .setStyle(ButtonStyle.Primary);
const approveButton = new ButtonBuilder()
    .setCustomId("approve_ticket")
    .setLabel(TicketButtonLabels.APPROVE)
    .setStyle(ButtonStyle.Success);
const rejectButton = new ButtonBuilder()
    .setCustomId("reject_ticket")
    .setLabel(TicketButtonLabels.REJECT)
    .setStyle(ButtonStyle.Danger);
export const BUTTON_ROW = new ActionRowBuilder().addComponents(createButton);
export const TICKET_ROW = new ActionRowBuilder().addComponents(approveButton, rejectButton);
