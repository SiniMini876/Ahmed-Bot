import { Message } from "discord.js";
import Client from "../../../Client";
import { Command } from "../../../Interfaces";

export const command: Command = {
    name: "pause",
    description: "Pause the currently playing music",
    usage: "!pause",
    async execute(client: Client, message: Message) {
        const queue = client.player.getQueue(message.guildId!);
        if (!queue || !queue.playing)
            return void message.reply({
                content: "❌ | No music is being played!",
            });

        const success = queue.setPaused(true);
        return void message.reply({
            content: success
                ? "✅ | The music is now paused!"
                : "❌ | Something went wrong!",
        });
    },
};
