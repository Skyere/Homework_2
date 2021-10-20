exports.run = async(client, message) => {
    const channel = message.member.voice.channel;
    if (!channel) return message.channel.send('You need to enter a channel!');
    let queue = message.client.queue.get(message.guild.id);
    if(!queue){ return message.channel.send({
        embed: {
            description: 'Queue is empty! Add something using play <songName>',
            color: 'RANDOM'
        }
    })
}
    if(queue.songs.length !== 0) {
        message.react('✅');
        queue.connection.dispatcher.end('Done!')
    }
}