require('dotenv').config();
const Discord = require("discord.js");
let PREFIX = process.env.PREFIX;

const client = new Discord.Client({intents: ['GUILDS', 'GUILD_MESSAGES'], partials: ['MESSAGE', 'REACTION']});
client.commands = new Discord.Collection();
client.slashcommands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.prefix = PREFIX;

['command_handler', 'event_handler', 'slashcommand_handler'].forEach(handler => {
  require(`./handlers/${handler}`)(Discord, client);
})

client.login(process.env.BOT_TOKEN);