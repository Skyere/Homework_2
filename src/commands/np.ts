import { Client, Message, MessageEmbed } from "discord.js";

export const np = async (_client: Client, message: Message) => {
    const channel = message.member?.voice.channel;

    if(channel == null) {
        return message.channel.send("You need to enter a channel!");
    }

    // @ts-ignore
    const queue = message.client.queue.get(message.guild?.id);

    if(queue == null) {
        return message.channel.send(new MessageEmbed()
            .setTitle("Nothing playing now!"))
    }

    return message.channel.send(new MessageEmbed()
        .setTitle("Now playing")
        .setDescription(`${queue.songs[0].title} requested by: <@${queue.songs[0].requester}>`)
        .setColor("RANDOM")
        .setThumbnail(queue.songs[0].thumbnail))
}
