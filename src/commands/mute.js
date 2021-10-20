const ms = require('ms');
const discord = require('discord.js');


exports.run = async(client, message, time) => {
    const target = message.mentions.users.first();
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("You do not have permission to do that!");
    if (target) {

        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
        const bans_channel = client.channels.cache.find(channel => channel.id === "Your logs channel");

        let memberTarget = message.guild.members.cache.get(target.id);

        if (!time[1]) {
            memberTarget.roles.add(muteRole.id);
            let Embed = new discord.MessageEmbed()
            .setTitle("Mute")
            .setColor("DARK_RED")
            .addField("WHO", `@${message.author.username}`)
            .addField("DISTURBER", target)
            bans_channel.send(Embed);
            return
        }
        
        memberTarget.roles.add(muteRole.id);
        let Embed = new discord.MessageEmbed()
            .setTitle("Mute")
            .setColor("DARK_RED")
            .addField("WHO", `@${message.author.username}`)
            .addField("DISTURBER", target)
            .addField('TIME', ms(ms(time[1])))
        bans_channel.send(Embed);

        setTimeout(function () {
            memberTarget.roles.remove(muteRole.id);
        }, ms(time[1]));
    } else {
        message.channel.send('Cant find that member!');
    }
}

