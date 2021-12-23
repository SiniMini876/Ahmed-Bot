const Discord = require('discord.js');
const { Client, Util, MessageEmbed, MessageAttachment } = require('discord.js');
const deploy = require('../../../Functions/deploytoheroku').deploy;

module.exports = {
    name: 'restart',
    cooldown: 60,
    usage: '!restart',
    description: 'The bot restarts, should take a couple of minutes',
    async execute(msg, args, client, Discord) {
        msg.channel.send('The bot will be online soon, wait like 3 minutes ✅');
        deploy();
    },
};
