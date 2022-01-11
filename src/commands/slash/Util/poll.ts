import { CommandInteraction, Guild, GuildMember, Message, MessageEmbed, TextChannel } from 'discord.js';
import dotenv from 'dotenv';
import Client from '../../../Client';
import { SlashCommand } from '../../../Interfaces';
dotenv.config();

export const command: SlashCommand = {
    name: 'poll',
    description: 'Creates a poll!',
    options: [
        {
            name: 'poll',
            description: 'The question that you want to ask!',
            required: true,
            type: 'STRING',
        },
    ],
    async execute(client: Client, interaction: CommandInteraction, member: GuildMember, channel: TextChannel, guild: Guild) {
        const poll = interaction.options.getString('poll');
        let embed = new MessageEmbed()
            .setTitle('📋 ' + '**' + poll + '**')
            .setAuthor('שואל הסקר: ' + member.user.username);

        interaction.editReply({ embeds: [embed] }).then((r) => {
            (r as Message).react('👍');
            (r as Message).react('👎');
        });
    },
};
