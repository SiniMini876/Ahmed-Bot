const wait = require('util').promisify(setTimeout);
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
require('dotenv').config();

module.exports = {
    name: 'kesem',
    description: '!קונכיית הקסם!',
    async execute(client, interaction, member, channel, guild) {
        const kesem = interaction.options.getString('השאלה');
        let replies = ['כן', 'לא', 'אני לא יודע, מה אני אעשה', 'תשאל מאוחר יותר אני נכה מידי כרגע'];

        let result = Math.floor((Math.random() * replies.length));

        let embed = new MessageEmbed()
        .setTitle('קונכיית הקסם!')
        .setFooter(member.user.username)
        .setColor('#FF9900')
        .addField('שאלה', kesem)
        .addField('תשובה', replies[result])
        .setThumbnail('https://i.kym-cdn.com/photos/images/masonry/000/355/434/560.gif');
        
        interaction.editReply({embeds: [embed]})
    },
};
