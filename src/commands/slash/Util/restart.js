const { MessageEmbed } = require('discord.js');
require('dotenv').config();
const deploy = require('../../../Functions/deploytoheroku').deploy;

module.exports = {
    name: 'restart',
    description: 'The bot restarts, should take a couple of minutes',
    async execute(client, interaction, member, channel, guild) {
        interaction.editReply(
            'The bot will be online soon, wait like 3 minutes ✅'
        );
        deploy();
    },
};
