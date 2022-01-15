import {
    CommandInteraction,
    GuildMember,
    TextChannel,
    Guild,
    Message,
    MessageEmbedImage,
} from 'discord.js';
import Client from '../../../Client';
import { Command } from '../../../Interfaces';

export const command: Command = {
    name: 'queue',
    description: 'See the queue',
    async execute(client: Client, message: Message, args: any[]) {
        const queue = client.player.getQueue(message.guildId!);
        if (!queue || !queue.playing)
            return void message.channel.send({
                content: '❌ | No music is being played!',
            });
        const currentTrack = queue.current;
        const tracks = queue.tracks
            .slice(0, 10)
            .map((m: { title: any; url: any }, i: number) => {
                return `${i + 1}. **${m.title}** ([link](${m.url}))`;
            });

        return void message.channel.send({
            embeds: [
                {
                    title: 'Server Queue',
                    thumbnail: {
                        url: currentTrack.playlist?.thumbnail ?? '',
                    },
                    description: `${tracks.join('\n')}${
                        queue.tracks.length > tracks.length
                            ? `\n...${
                                  queue.tracks.length - tracks.length === 1
                                      ? `${
                                            queue.tracks.length - tracks.length
                                        } more track`
                                      : `${
                                            queue.tracks.length - tracks.length
                                        } more tracks`
                              }`
                            : ''
                    }`,
                    color: '#ffb217',
                    fields: [
                        {
                            name: 'Now Playing',
                            value: `🎶 | **${currentTrack.title}** ([link](${currentTrack.url}))`,
                        },
                        {
                            name: 'Filters:',
                            value: `These filters are enabled:\n${queue
                                .getFiltersEnabled()
                                .toString()}`,
                        },
                        {
                            name: 'Repeat Mode:',
                            value: `${queue.repeatMode}`,
                        },
                    ],
                },
            ],
        });
    },
};
