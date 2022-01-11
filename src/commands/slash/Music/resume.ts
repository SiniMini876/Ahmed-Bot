import { CommandInteraction, GuildMember, TextChannel, Guild } from "discord.js";
import Client from "../../../Client";
import { SlashCommand } from "../../../Interfaces";

export const command: SlashCommand = {
    name: 'resume',
    description: 'Resume the current song',
    execute(client: Client, interaction: CommandInteraction, member: GuildMember, channel: TextChannel, guild: Guild) {
        const queue = client.player.getQueue(interaction.guildId!);
        if (!queue || !queue.playing)
            return void interaction.editReply({
                content: '❌ | No music is being played!',
            });

        // Gets the current song
        const success = queue.setPaused(false);
        return void interaction.editReply({
            content: success
                ? `✅ | The music is now resumed!`
                : '❌ | Something went wrong!',
        });
    },
};
