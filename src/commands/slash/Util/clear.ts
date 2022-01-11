import {
    CommandInteraction,
    GuildMember,
    TextChannel,
    Guild,
} from 'discord.js';
import dotenv from 'dotenv';
import Client from '../../../Client';
import { SlashCommand } from '../../../Interfaces';
dotenv.config();

export const command: SlashCommand = {
    name: 'clear',
    description: 'Deletes the amount of the message you want to delete.',
    options: [
        {
            name: 'amount',
            description: 'The amount of the message you want to delete.',
            required: true,
            type: 'NUMBER',
        },
    ],
    async execute(
        client: Client,
        interaction: CommandInteraction,
        member: GuildMember,
        channel: TextChannel,
        guild: Guild
    ) {
        const amount = interaction.options.getNumber('amount');

        if (!member.permissions.has('MANAGE_ROLES'))
            return interaction.editReply(
                "You don't have the permission to do this."
            );
        interaction.editReply('Deleting ' + amount + ' messages.');
        return channel.bulkDelete(amount!);
    },
};
