import Discord, { CommandInteraction, Guild, GuildMember, Message, TextChannel } from 'discord.js';
import Client from '../../../Client';
import { SlashCommand } from '../../../Interfaces';

export const command: SlashCommand = {
    name: 'ping',
    description: 'Pinging the bot!',
    async execute(client: Client, interaction: CommandInteraction, member: GuildMember, channel: TextChannel, guild: Guild) {
        const reply1 = await interaction.editReply({
            content: '🏓 Pinging...',
        });

        const embed = new Discord.MessageEmbed()
            .setTitle('🏓 Pong!')
            .setDescription(
                `Bot Latency is **${Math.floor(
                    ((reply1 as Message).createdTimestamp as number) - interaction.createdTimestamp
                )} ms** \nAPI Latency is **${Math.round(client.ws.ping)} ms**`
            );

        interaction.editReply({ embeds: [embed] });
    },
};
