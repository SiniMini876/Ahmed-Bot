const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = {
    name: 'clear',
    description: 'clears',
    async execute(client, interaction, member, channel, guild) {
        const amount = interaction.options.getNumber('amount');

        if (!member.permissions.has('MANAGE_ROLES'))
            return interaction.editReply(
                "You don't have the permission to do this."
            );
        interaction.editReply("Deleting " + amount + " messages.");
        return channel.bulkDelete(amount)
    },
};
