import { Message } from 'discord.js';
import Client from '../../../Client';
import { Command } from '../../../Interfaces';

export const command: Command = {
    name: 'np',
    description: 'Show now playing song',
    usage: '!np',
    async execute(client: Client, message: Message, args: string[]) {
        const queue = client.player.getQueue(message.guildId!);
        if (!queue || !queue.playing)
            return void message.reply({
                content: '❌ | No music is being played!',
            });

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return void message.reply({
            embeds: [
                {
                    title: 'Now Playing',
                    description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
                    fields: [
                        {
                            name: '*Volume: *',
                            value: `\`${queue.volume.toString()}\``
                        },
                        {
                            name: '\u200b',
                            value: progress,
                        },
                        {
                            name: "Up next: ",
                            value: queue.tracks[1]!.title || "None"
                        }
                    ],
                    color: 0xffffff,
                },
            ],
        });
    },
};
