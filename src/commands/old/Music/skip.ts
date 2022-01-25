import { Message } from "discord.js";
import Client from "../../../Client";
import { Command } from "../../../Interfaces";

export const command: Command = {
    name: "skip",
    aliases: ["s"],
    description: "Skip the currently playing song",
    usage: "!skip",
    execute(client: Client, message: Message) {
        const queue = client.player.getQueue(message.guildId!);
        if (!queue || !queue.playing)
            return void message.reply({
                content: "❌ | No music is being played!",
            });
        const currentTrack = queue.current;
        const success = queue.skip();
        return void message.reply({
            content: success
                ? `✅ | Skipped **${currentTrack}**!`
                : "❌ | Something went wrong!",
        });
    },
};
