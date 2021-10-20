const Discord = require('discord.js');
var createIssue = require('github-create-issue');

var repo = 'Your repo name like Skyere/DiscordBot'
const token = 'Token for your Github account';
const issueTitle = 'Your Title';
let labels;

const talkedRecently = new Set();


exports.run = async (client, message) => {

    //Delete that if you want to command works everywhere
    if (message.guild != null) return message.reply("Command works only in a DM");
    if (talkedRecently.has(message.author.id)) {
            message.reply("Your statement is being coinsidering");
    } else {

        const messageEmbed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Hello!')
            .setDescription(`Here you can explain what went wrong!`)
        await message.reply(messageEmbed);
        
        const awaitMessage = () =>
            message.channel.awaitMessages(() =>
                message.author.id === message.author.id && message.content !== undefined,
                { max: 1, time: 150000, errors: ["time"] });
    
        const BugEmbed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Explain what went wrong:')
        .setDescription('Please give to us as much as possible information about your error')
    
        await message.reply(BugEmbed);
    
        const messageWithBug = await awaitMessage();
        const bug = messageWithBug.first()?.content;
    
        const ImageEmbed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('You can attach the image:')
        .setDescription('If you wont attach type "No"')
    
        await message.reply(ImageEmbed);
    
        const messageWithImage = await awaitMessage();
        var image = messageWithImage.first()?.content;
    
        const VideoEmbed = new Discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('You can attached the Video:')
        .setDescription('If you wont attach type "No"')
    
        await message.reply(VideoEmbed);
    
        const messageWithVideo = await awaitMessage();
        var video = messageWithVideo.first()?.content;
    
        
    
    
        if (!video.toLowerCase().includes('http')) {
            video = "Video was not attached!";
        }
    
        if (!image.toLowerCase().includes('http')) {
            image = "Image was not attached!";
        }
    
    
        var opts = {
            'token': token,
            'useragent': 'Skyere',
            'body': `Bug: ${bug}\n` + `Video: ${video}\n` + `Image: ${image}\n` + `Author: ${message.author.username}`
        };
         
        await createIssue( repo, issueTitle , opts, clbk );
    
        await message.reply(`Your statement was successfully sent.
Thank in advance)`);
         
        function clbk( error, issue, info ) {
            if ( info ) {
                console.error( info );
            }
            if ( error ) {
                throw new Error( error.message );
            }
            console.log( issue );
        }
    
    };


        talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 350000);
    }



