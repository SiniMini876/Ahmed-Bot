import { CommandInteraction, GuildMember, TextChannel, Guild } from "discord.js";
import Client from "../../../Client";
import { SlashCommand } from "../../../Interfaces";

export const command: SlashCommand = {
    name: 'queue',
    description: 'See the queue',
    async execute(client: Client, interaction: CommandInteraction, member: GuildMember, channel: TextChannel, guild: Guild) {
        const queue = client.player.getQueue(interaction.guildId!);
        if (!queue || !queue.playing)
            return void interaction.editReply({
                content: '❌ | No music is being played!',
            });
        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(0, 10).map((m: { title: any; url: any; }, i: number) => {
            return `${i + 1}. **${m.title}** ([link](${m.url}))`;
        });

        return void interaction.editReply({
            embeds: [
                {
                    title: 'Server Queue',
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
                    color: 0xff0000,
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
