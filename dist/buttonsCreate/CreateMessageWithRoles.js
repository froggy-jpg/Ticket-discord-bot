import { MessageFlags } from "discord.js";
import { Event } from "../core/Event.js";
import { reactionRoleBinds, reactionRoleMessages, saveReactionRoles, } from "../stores/roleSetup.store.js";
export class CreateMessageWithRoles extends Event {
    bot;
    type = "interactionCreate";
    constructor(bot) {
        super();
        this.bot = bot;
    }
    async execute(interaction) {
        if (!interaction.isChatInputCommand())
            return;
        if (interaction.commandName !== "sendrolemessage")
            return;
        if (!interaction.guild)
            return;
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        const messageInput = interaction.options.getString("message", true);
        const collection = interaction.options.getString("collection", true);
        const message = messageInput.replace(/\\n/g, "\n");
        const channel = interaction.channel;
        if (!channel || !channel.isTextBased())
            return;
        const map = reactionRoleBinds[collection];
        if (!map || Object.keys(map).length === 0) {
            await interaction.reply({
                content: `❌ Collection \`${collection}\` is empty!`,
                ephemeral: true,
            });
            return;
        }
        const msg = await channel.send({ content: message });
        for (const emoji of Object.keys(map)) {
            try {
                await msg.react(emoji);
            }
            catch (err) {
                console.log("Invalid emoji:", emoji);
            }
        }
        reactionRoleMessages[msg.id] = collection;
        saveReactionRoles();
        await interaction.editReply({
            content: `Created!`,
        });
    }
}
