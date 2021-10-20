import { Client, Message } from "discord.js";

export const prizma = async (_client: Client, message: Message) => {
    if(!message.member?.hasPermission('MANAGE_MESSAGES')) {
        return message.reply("You do not have permission to do that!");
    }

    const target = message.mentions.members?.first();

    if(target == null) {
        return message.reply("Member is not found!");
    }

    await message.react("⏳");

    for(let i = 0; i < 69; i++) {
        await target.send(`Your message`);
    }

    await message.reactions.cache
        ?.find(reaction => reaction.emoji.identifier == "hourglass_flowing_sand")
        ?.remove()

    return message.react('✅');
}