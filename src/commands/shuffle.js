exports.run = async(client, message, args) => {
    const channel = message.member.voice.channel;
    if (!channel) return message.channel.send('You need to enter a channel!');
    const queue = message.client.queue.get(message.guild.id);
    if(!queue) return message.channel.send('queue is empty!');
    let songs = queue.songs;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    queue.songs = songs;
    message.client.queue.set(message.guild.id, queue);
    message.channel.send(`queue was shuffled 🔀`).catch(console.error);
}
