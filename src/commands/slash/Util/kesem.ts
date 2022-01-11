import { CommandInteraction, Guild, GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import dotenv from 'dotenv';
import Client from '../../../Client';
import { SlashCommand } from '../../../Interfaces';
dotenv.config();

export const command: SlashCommand = {
    name: 'kesem',
    description: '!קונכיית הקסם',
    options: [
        {
            name: 'השאלה',
            description: 'השאלה שאתה רוצה לשאול',
            required: true,
            type: 'STRING',
        },
    ],
    async execute(client: Client, interaction: CommandInteraction, member: GuildMember, channel: TextChannel, guild: Guild) {
        const kesem = interaction.options.getString('השאלה');
        let replies = [
            'כן',
            'לא',
            'אני לא יודע, מה אני אעשה',
            'תשאל מאוחר יותר אני נכה מידי כרגע',
        ];

        let result = Math.floor(Math.random() * replies.length);

        let embed = new MessageEmbed()
            .setTitle('קונכיית הקסם!')
            .setFooter(member.user.username)
            .setColor('#FF9900')
            .addField('שאלה', kesem!)
            .addField('תשובה', replies[result])
            .setThumbnail(
                'https://i.kym-cdn.com/photos/images/masonry/000/355/434/560.gif'
            );

        interaction.editReply({ embeds: [embed] });
    },
};
