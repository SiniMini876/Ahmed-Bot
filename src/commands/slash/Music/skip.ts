/* eslint-disable no-unused-vars */
import { CommandInteraction, GuildMember, TextChannel, Guild } from "discord.js";
import Client from "../../../Client";
import { SlashCommand } from "../../../Interfaces";

export const command: SlashCommand = {
    name: "skip",
    description: "Skip to the current song",
    execute(client: Client, interaction: CommandInteraction, member: GuildMember, channel: TextChannel, guild: Guild) {
        const queue = client.player.getQueue(interaction.guildId!);
        if (!queue || !queue.playing)
            return void interaction.editReply({
                content: "❌ | No music is being played!",
            });
        const currentTrack = queue.current;
        const success = queue.skip();
        return void interaction.editReply({
            content: success
                ? `✅ | Skipped **${currentTrack}**!`
                : "❌ | Something went wrong!",
        });
    },
};
