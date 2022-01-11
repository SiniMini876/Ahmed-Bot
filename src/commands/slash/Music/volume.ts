import { CommandInteraction, GuildMember, TextChannel, Guild } from "discord.js";
import Client from "../../../Client";
import { SlashCommand } from "../../../Interfaces";

export const command: SlashCommand = {
    name: 'volume',
    description: 'Sets music volume',
    options: [
        {
            name: 'amount',
            type: 'NUMBER',
            description: 'The volume amount to set (0-100)',
            required: false,
        },
    ],
    execute(client: Client, interaction: CommandInteraction, member: GuildMember, channel: TextChannel, guild: Guild) {
        const queue = client.player.getQueue(interaction.guildId!);
        if (!queue || !queue.playing)
            return void interaction.editReply({
                content: '❌ | No music is being played!',
            });

        const vol = interaction.options.get('amount');
        if (!vol)
            return void interaction.editReply({
                content: `🎧 | Current volume is **${queue.volume}**%!`,
            });
        if (vol.value! < 0 || vol.value! > 100)
            return void interaction.editReply({
                content: '❌ | Volume range must be 0-100',
            });
        const success = queue.setVolume(vol.value as number);
        return void interaction.editReply({
            content: success
                ? `✅ | Volume set to **${vol.value}%**!`
                : '❌ | Something went wrong!',
        });
    },
};
