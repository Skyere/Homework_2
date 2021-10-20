import { Client, Message } from "discord.js";

export const help = async (_client: Client, message: Message) => {
    await message.delete();
    await message.channel.send({
        embed: {
            title: '**Help command 🎶**',
            description: `
            __**Commands**__
            
            \`play\` <songName> => Play music.
            \`lyrics\` <songName> => Get music lyrics.
            \`shuffle\`  => Shuffle queue.
            \`pause\` => Stop playing.
            \`resume\` => Resume playing.
            \`np\` => show what playing now.
            \`skip\` => Skip the song.
            \`stop\` => Stop and clear queue.
            \`volume\` <value> => Change volume.
            \`queue\` => Show queue list.
            \`prizma\` => Spam for current user.
            \`clear\`<MessageCount> => Clear command.
            \`mute\` <Member> <Time> => Mute command.
            \`unmute\` <Member> => Unmute command
            \`reload\` <CommandName> => Reload some command.`,
            footer: {
                text: `Command used by @${message.author.username}`,
                icon_url: message.author.displayAvatarURL(),
            },
            color: "RANDOM",
        },
    })
}
