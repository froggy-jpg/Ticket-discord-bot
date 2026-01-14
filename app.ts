import { DiscordBot } from "./core/DiscordBot.js";
import { TicketActions } from "./buttonsCreate/TicketActions.js";
import { CreateMessage } from "./buttonsCreate/CreateMessage.js";
import { HandleRole } from "./buttonsHandle/HandleRoleSetup.js";
import { CreateMessageWithRoles } from "./buttonsCreate/CreateMessageWithRoles.js";
import { setupReactionRoles } from "./buttonsHandle/ReactionHandle.js";
import { HandleCommandsButtons } from "./buttonsHandle/HandleCommandsButtons.js";
try {
  const bot = new DiscordBot();
  bot.initializeEvent(new TicketActions(bot));
  bot.initializeEvent(new CreateMessage(bot));
  bot.initializeEvent(new HandleCommandsButtons(bot));
  bot.initializeEvent(new HandleRole(bot));
  bot.initializeEvent(new CreateMessageWithRoles(bot));
  setupReactionRoles(bot.client);
  bot.start();
} catch (e) {
  console.log(e);
}
