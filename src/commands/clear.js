exports.run = async(client, message, args) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("You do not have permission to do that!");
    if(!args[0]) return message.reply("Type a count of messages!");
    await message.channel.messages.fetch({limit: args[0]}).then(messages => {
        message.channel.bulkDelete(messages);
    });

}