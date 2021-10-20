exports.run = async(client, message, args) => {
    const channel = message.member.voice.channel;
    if (!channel) return message.channel.send('You need to enter a channel!');

    let queue = message.client.queue.get(message.guild.id);

    if(!args[0]) return message.channel.send({
        embed: {
            description: 'Volume is: ' + queue.volume
        }
    })

    if(args[0] > 10) return message.channel.send('Volume (1 - 10)')

    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
    queue.volume = args[0]
    message.channel.send({
        embed: {
            description: 'Volume is ' + args[0]
        }
    })
}