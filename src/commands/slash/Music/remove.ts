import {
    CommandInteraction,
    GuildMember,
    TextChannel,
    Guild,
} from 'discord.js';
import Client from '../../../Client';
import { SlashCommand } from '../../../Interfaces';

export const command: SlashCommand = {
    name: 'remove',
    description: 'Remove a specific track out of the queue',
    options: [
        {
            name: 'tracknumber',
            type: 'NUMBER',
            description:
                'The number of the track in the queue, you can check that out with /queue',
            required: true,
        },
    ],
    execute(
        client: Client,
        interaction: CommandInteraction,
        member: GuildMember,
        channel: TextChannel,
        guild: Guild
    ) {
        const queue = client.player.getQueue(interaction.guildId!);
        if (!queue || !queue.playing)
            return void interaction.editReply({
                content: '❌ | No music is being played!',
            });

        const track = interaction.options.getNumber('tracknumber')! - 1;

        if (!track)
            return interaction.editReply(
                'You have to specify which song do you want to remove from the queue -- !remove <1, 2, 3 or the exact name of the track -- check it with /queue>'
            );

        queue.remove(track);

        interaction.editReply(
            `✅ | Track ${interaction.options.getNumber('tracknumber')} has been removed from the queue!`
        );
    },
};
