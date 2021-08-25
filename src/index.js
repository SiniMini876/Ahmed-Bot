require('dotenv').config();
const Discord = require('discord.js');
let PREFIX = process.env.prefix;

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
    partials: ['MESSAGE', 'REACTION'],
});
client.commands = new Discord.Collection();
client.slashcommands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.prefix = PREFIX;

['command_handler', 'event_handler', 'slashcommand_handler'].forEach(
    (handler) => {
        require(`./handlers/${handler}`)(Discord, client);
    }
);

client.login(process.env.BOT_TOKEN);
