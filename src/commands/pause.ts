import { Client, Message, MessageEmbed } from "discord.js";

export const pause = async (_client: Client, message: Message) => {
    const channel = message.member?.voice.channel;

    if(channel == null) {
        return message.channel.send("You need to enter a channel!");
    }

    // @ts-ignore
    const queue = message.client.queue.get(message.guild?.id);

    if(queue == null) {
        return message.channel.send(new MessageEmbed()
            .setTitle("Nothing playing now!"));
    }

    if(queue.playing) {
        queue.connection.dispatcher.pause();
    }

    await message.react('⏸');
    return message.channel.send('Paused The music!');
}