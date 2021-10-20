import { Client, Message, MessageEmbed, VoiceConnection } from "discord.js";
import { search } from "scrape-yt";
import { validateNotNil } from "validation-utils";
import ytdl from "ytdl-core-discord";

export const play = async (_client: Client, message: Message, args: string[]) => {
    if(args[0] == null) {
        return message.channel.send("You dont typed a music name!")
    }

    const channel = message.member?.voice.channel;
    if(channel == null) {
        return message.channel.send("You need to enter a channel!");
    }

    if(!channel.permissionsFor(validateNotNil(message.client.user))?.has("CONNECT")) {
        return message.channel.send("Bot does not have permission to connect!");
    }

    if(!channel.permissionsFor(validateNotNil(message.client.user))?.has("SPEAK")) {
        return message.channel.send("Something went wrong!");
    }


    // @ts-ignore
    const server = message.client.queue.get(message.guild?.id);
    const video = (await search(args.join(' '), {
        type: "video",
    }))[0]

    if(video == null) {
        return message.channel.send("Video is not found");
    }

    const song = {
        id: video.id,
        title: video.title,
        duration: video.duration ?? 0,
        thumbnail: video.thumbnail,
        upload: video.uploadDate,
        requester: message.author,
        channel: video.channel.name,
        channelurl: video.channel.url
    };
    type Song = typeof song;

    const date = new Date(0);
    date.setSeconds(song.duration);

    const timeString = date.toISOString().substr(11, 8);

    if(server) {
        server.songs.push(song);

        return message.channel.send(new MessageEmbed()
            .setTitle("Added to queue!")
            .setColor("BLACK")
            .addField("Name", song.title, true)
            .setThumbnail(song.thumbnail)
            .addField("Reqeusted By", song.requester, true)
            .addField("Duration", timeString, true))
    }

    const queueConstruct = {
        textChannel: message.channel,
        voiceChannel: channel,
        connection: null as null | VoiceConnection,
        songs: [] as Song[],
        volume: 2,
        playing: true,
    };
    
    // @ts-ignore
    message.client.queue.set(message.guild?.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async (song: Song) => {
        // @ts-ignore
        const queue = message.client.queue.get(message.guild?.id);

        if(song == null) {
            queue.voiceChannel.leave();
            // @ts-ignore
            return message.client.queue.delete(message.guild?.id);
        }

        const dispatcher = queue.connection.play(await ytdl(`https://youtube.com/watch?v=${song.id}`, {
            highWaterMark: 1 << 25
        }), {
            type: 'opus'
        })
            .on("finish", () => {
                queue.songs.shift();
                play(queue.songs[0]);
            })
            .on("error", console.warn);
        dispatcher.setVolumeLogarithmic(queue.volume / 5);

        queue.textChannel.send(new MessageEmbed()
            .setTitle('Now Playing')
            .setColor("BLACK")
            .setThumbnail(song.thumbnail)
            .addField('Name', song.title, true)
            .addField('Requested By', song.requester, true)
            .addField('Duration', timeString, true));
    };


    try {
        const connection = await channel.join();
        queueConstruct.connection = connection;

        if(queueConstruct.songs[0] != null) {
            play(queueConstruct.songs[0]);
        }
    } catch(error) {
        // @ts-ignore;
        message.client.queue.delete(message.guild?.id);
        await channel.leave();

        return message.channel.send("I cant enter a channel!: ${error}");
    }

    return;
}