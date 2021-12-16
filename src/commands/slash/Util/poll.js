const wait = require('util').promisify(setTimeout);
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
require('dotenv').config();

module.exports = {
    name: 'poll',
    description: 'יוצר סקר!',
    async execute(client, interaction, member, channel, guild) {
        const poll = interaction.options.getString('poll');
        let embed = new MessageEmbed()
        .setTitle('📋 ' + '**' + poll + '**')
        .setAuthor( "שואל הסקר: " + member.user.username);

        interaction.editReply({embeds: [embed]}).then(r => {
            r.react("👍")
            r.react("👎")
        })
    },
};
