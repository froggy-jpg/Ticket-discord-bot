import { reactionRoleBinds, reactionRoleMessages, } from "../stores/roleSetup.store.js";
export function setupReactionRoles(client) {
    client.on("messageReactionAdd", async (reaction, user) => {
        if (user.partial)
            await user.fetch();
        if (reaction.partial)
            await reaction.fetch();
        if (!reaction.message.guild)
            return;
        if (user.bot)
            return;
        const messageId = reaction.message.id;
        const collection = reactionRoleMessages[messageId];
        if (!collection)
            return;
        const map = reactionRoleBinds[collection];
        if (!map)
            return;
        const emoji = reaction.emoji.id
            ? `<:${reaction.emoji.name}:${reaction.emoji.id}>`
            : reaction.emoji.name;
        if (!emoji)
            return;
        const roleId = map[emoji];
        if (!roleId)
            return;
        const member = await reaction.message.guild.members.fetch(user.id);
        await member.roles.add(roleId);
    });
    client.on("messageReactionRemove", async (reaction, user) => {
        if (user.partial)
            await user.fetch();
        if (reaction.partial)
            await reaction.fetch();
        if (!reaction.message.guild)
            return;
        if (user.bot)
            return;
        const messageId = reaction.message.id;
        const collection = reactionRoleMessages[messageId];
        if (!collection)
            return;
        const map = reactionRoleBinds[collection];
        if (!map)
            return;
        const emoji = reaction.emoji.id
            ? `<:${reaction.emoji.name}:${reaction.emoji.id}>`
            : reaction.emoji.name;
        if (!emoji)
            return;
        const roleId = map[emoji];
        if (!roleId)
            return;
        const member = await reaction.message.guild.members.fetch(user.id);
        await member.roles.remove(roleId);
    });
}
