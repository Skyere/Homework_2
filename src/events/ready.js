module.exports = (client) => {
    console.log('Login ' + client.user.tag);
    console.log('Ready');

    // Presence
    const i = 0;
    const statusesList = [
        { type: 'PLAYING',  message: 'Your status'  },
        { type: 'PLAYING', message: 'Your status' },
        { type: 'LISTENING', message: 'Your status' },
        { type: 'STREAMING', url: "", message: 'Your status' }
    ];
    
    setInterval( async () => {
        i = (i + 1) % statusesList.length;
        const presence = statusesList[i];
        if (!presence.url) client.user.setActivity(presence.message, { type: presence.type });
    
        await client.user.setActivity(presence.message, { type: presence.type, url: "Your Video URL" });
    }, 15000);
   

}