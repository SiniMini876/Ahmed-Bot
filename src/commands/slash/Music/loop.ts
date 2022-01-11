import { QueueRepeatMode } from 'discord-player';
import {
    CommandInteraction,
    GuildMember,
    TextChannel,
    Guild,
} from 'discord.js';
import Client from '../../../Client';
import { SlashCommand } from '../../../Interfaces';

export const command: SlashCommand = {
    name: 'loop',
    description: 'Sets loop mode',
    options: [
        {
            name: 'mode',
            type: 'INTEGER',
            description: 'Loop type',
            required: true,
            choices: [
                {
                    name: 'Off',
                    value: QueueRepeatMode.OFF,
                },
                {
                    name: 'Track',
                    value: QueueRepeatMode.TRACK,
                },
                {
                    name: 'Queue',
                    value: QueueRepeatMode.QUEUE,
                },
                {
                    name: 'Autoplay',
                    value: QueueRepeatMode.AUTOPLAY,
                },
            ],
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
        const loopMode = interaction.options.get('mode')!.value;
        const success = queue.setRepeatMode(loopMode as any);
        const mode =
            loopMode === QueueRepeatMode.TRACK
                ? '🔂'
                : loopMode === QueueRepeatMode.QUEUE
                ? '🔁'
                : '▶';
        return void interaction.editReply({
            content: success
                ? `${mode} | Updated loop mode!`
                : '❌ | Could not update loop mode!',
        });
    },
};
