import Discord, { Client } from "discord.js";
import * as fs from "fs";
import { validateNotNil } from "validation-utils";

import { annou } from "@commands/annou";
import { help } from "@commands/help";
import { lyrics } from "@commands/lyrics";
import { np } from "@commands/np";
import { pause } from "@commands/pause";
import { play } from "@commands/play";
import { prizma } from "@commands/prizma";
import { commandDispatcher } from "@/events/message/command_dispatcher";

const commands = {
    annou,
    help,
    lyrics,
    np,
    pause,
    play,
    prizma,
}

const events = {
    message: [commandDispatcher],
}

const client = new Discord.Client();
const config = require("@/config").default;

// @ts-ignore
client.config = config;

// @ts-ignore
client.queue = new Map()

// Events loading
fs.readdir("./src/events/", (err, files) => {
    if(err) return console.error(err);
    files.filter(file => file.endsWith(".js")).forEach(file => {
        const event = require(`./events/${file}`);
        const eventName = validateNotNil(file.split(".")[0]);
        client.on(eventName, event.bind(null, client));
    });
});

Object.entries(events).forEach(([event, handlers]) =>
    client.on(event, (...args) =>
        handlers.forEach(handler =>
            (handler as (client: Client, ...args: any[]) => void)(client, ...args))));

// @ts-ignore
client.commands = new Discord.Collection()

// Commands loading
fs.readdir("./src/commands/", (err, files) => {
    if(err) return console.error(err);
    files.forEach(file => {
        if(!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`${commandName} Is Ready Now..`);
        // @ts-ignore
        client.commands.set(commandName, props);
    });
});

// @ts-ignore
Object.entries(commands).forEach(([command, handler]) => client.commands.set(command, {
    run: handler,
}));


// Vote system
client.on("message", async (message) => {
    let channel = message.channel.id;
    // @ts-ignore
    if(channel == "Your vote' channel id") {
        await message.react("✅");
        await message.react("❎");
    }
});
// @ts-ignore
client.login("Put your token");