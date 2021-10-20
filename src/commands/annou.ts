import { logger } from "@/logger";
import { sleep } from "@/util";
import { Client, Message, MessageEmbed } from "discord.js";
import { validateNotNil } from "validation-utils";

export const annou = async (client: Client, message: Message) => {
    // @ts-ignore
    if(!message.member || !process.env.ANNOU_ADMINS.includes(message.member.id)) {
        return message.reply("You do not have permission to do that!");
    }

    await message.reply("Type a dynamic title:");
    const awaitMessage = () =>
        message.channel.awaitMessages((m: Message) =>
            m.author.id === message.author.id && m.content !== undefined,
            { max: 1, time: 30000, errors: ["time"] });

    const messageWithTitle = await awaitMessage();
    const dynamicTitle = validateNotNil(messageWithTitle.first()?.content);

    await message.reply("Type a dynamic URL:");

    const messageWithURL = await awaitMessage();
    const dynamicURL = validateNotNil(messageWithURL.first()?.content);

    await message.reply("Type a dynamic Image: ");

    const messageWithImage = await awaitMessage();
    const dynamicImage = validateNotNil(messageWithImage.first()?.content);


    await message.reply("Type a dynamic text:");

    const messageWithText = await awaitMessage();
    const dynamicText = validateNotNil(messageWithText.first()?.content);

    //You can configure that using https://discordjs.guide/popular-topics/embeds.html#embed-preview
    const embed = new MessageEmbed()
        .setColor('#ffffff')
        .setTitle(dynamicTitle)
        .setURL(dynamicURL)
        .setAuthor('Your text', 'Your text', 'Your text')
        .setDescription('Your text')
        .setColor('#ffffff')
        .addFields(
            { name: 'Your text', value: dynamicText },
            { name: '\u200B', value: '\u200B' },
            { name: 'Your text', value: 'Your text' },
            { name: '\u200B', value: '\u200B' },
            { name: 'Your text', value: 'Your text', inline: true },
            { name: 'Your text', value: 'Your text', inline: true },
        )
        .setImage(dynamicImage)
        .setTimestamp()

    await message.reply(embed);

    await message.reply("Are you sure? Y/N");

    const messageWithConfirm = await awaitMessage();
    const confirm = validateNotNil(messageWithConfirm.first()?.content);

    if(confirm.toLowerCase() != "y") {
        return await message.reply("Cancelled");
    }

    const members = Array.from(validateNotNil(message.guild).members.cache
        .filter(member => member.id !== client.user?.id && !member.user.bot))
        .map(([_key, value]) => value)
//        .filter(member => !config.usersToBeIgnoredByAnnouncementCommand.includes(member.id))
    let successfullySent = 0;

    const info = `Sending announcement to ${members.length} members`;
    logger.info(info);
    await message.reply(info);

    for(const [i, member] of members.entries()) {
        try {
            await member.send(embed);

            logger.debug(`Announcement sent to ${member.user.username} (${member.displayName})`);
            successfullySent++;
        } catch(error) {
            logger.warn(`Failed to send announcement to ${member.user.username} (${member.displayName})`, error);
        }

        if(i !== members.length - 1) {
            await sleep(Math.random() * 1000 + 2000);

            if(i % 30 === 0 && i !== 0) {
                await sleep(Math.random() * 5000 + 28000);
            }
        }
    }

    const response = `Announcement sent to ${successfullySent} members`
    logger.info(response);
    return message.reply(response);
};