import { Client, Message, MessageEmbed } from "discord.js";
import lyricsFinder from "lyrics-finder";

export const lyrics = async (_client: Client, message: Message) => {
    // @ts-ignore
    const queue = message.client.queue.get(message.guild?.id);

    if(queue == null) {
      return message.channel.send("Nothing playing now");
    }

    const lyrics = await lyricsFinder("", queue.songs[0].title);

    const response = lyrics.length === 0 ?
      `Text was not found ${queue.songs[0].title} :(` :
      lyrics

    const embed = new MessageEmbed()
      .setTitle(`Text ${queue.songs[0].title}`)
      .setDescription(response.substr(0, 2045))
      .setColor("RANDOM")
      .setTimestamp()

    return message.channel.send(embed);
}
