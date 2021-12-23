const Discord = require('discord.js');
require('dotenv').config();
let TOKEN = process.env.BOT_TOKEN,
    PREFIX = process.env.PREFIX;

const client = new Discord.Client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGES',
        'GUILD_VOICE_STATES',
        'GUILD_MESSAGE_TYPING',
        'GUILD_EMOJIS_AND_STICKERS',
        'GUILD_BANS',
        'GUILD_PRESENCES',
        'GUILD_INVITES',
    ],
});

const { Player } = require('discord-player');
const player = new Player(client, {
    ytdlDownloadOptions: {
        filter: 'audioonly',
    },
});

client.player = player;
client.slashcommands = new Discord.Collection();
client.oldcommands = new Discord.Collection();
client.events = new Discord.Collection();
client.prefix = PREFIX;

['event_handler', 'command_handler', 'slashcommand_handler'].forEach(
    (handler) => {
        require(`./handlers/${handler}`)(Discord, client);
    }
);

client.login(TOKEN);
