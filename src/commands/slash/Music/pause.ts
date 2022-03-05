/* eslint-disable no-unused-vars */
import {
    CommandInteraction,
    GuildMember,
    TextChannel,
    Guild,
} from "discord.js";
import Client from "../../../Client";
import { SlashCommand } from "../../../Interfaces";

export const command: SlashCommand = {
    name: "pause",
    description: "Pause the current song",

    async execute(
        client: Client,
        interaction: CommandInteraction,
        member: GuildMember,
        channel: TextChannel,
        guild: Guild
    ) {
        const queue = client.player.getQueue(interaction.guildId!);
        if (!queue || !queue.playing)
            return void interaction.editReply({
                content: "❌ | No music is being played!",
            });

        const success = queue.setPaused(true);
        return void interaction.editReply({
            content: success
                ? "✅ | The music is now paused!"
                : "❌ | Something went wrong!",
        });
    },
};
