import { CommandInteraction, GuildMember, TextChannel, Guild } from "discord.js";
import Client from "../../../Client";
import { SlashCommand } from "../../../Interfaces";

export const command: SlashCommand = {
    name: 'np',
    description: 'Now Playing',
    execute(client: Client, interaction: CommandInteraction, member: GuildMember, channel: TextChannel, guild: Guild) {
        const queue = client.player.getQueue(interaction.guildId!);
        if (!queue || !queue.playing)
            return void interaction.editReply({
                content: '❌ | No music is being played!',
            });

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return void interaction.editReply({
            embeds: [
                {
                    title: 'Now Playing',
                    description: `🎶 | **${queue.current.title}**! Progress: (\`${perc.progress}%\`)`,
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
