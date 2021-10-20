exports.run = async(client, message) => {
    const channel = message.member.voice.channel;
    if (!channel) return message.channel.send('You need to enter a channel!');
    let queue = message.client.queue.get(message.guild.id);
    if(!queue) return message.channel.send({
        embed: {
            description: 'Nothing playing now!'
        }
    })
    if(queue.playing !== false) {
        queue.connection.dispatcher.resume()
        message.react('▶');
        message.channel.send('Resumed The music!');
    }
}