import { logger } from "@/logger";
import { Client, Message } from "discord.js";

export const commandDispatcher = async (client: Client, message: Message) => {
    if(message.author.bot) {
        return;
    }


    // @ts-ignore
    if(message.content.indexOf(process.env.PREFIX) !== 0) {
        return;
    }

    // @ts-ignore
    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
    const command = args.shift()?.toLowerCase();

    // @ts-ignore
    const handler = client.commands.get(command);

    if(handler?.run == null) {
        logger.warn(`Command ${command} not found`);
        return;
    }

    try {
        logger.debug(`Command ${command} (${args}) is being executed by ${message.author.username}`);
        await handler.run(client, message, args);
    } catch(error) {
        logger.error(error);
    }
};