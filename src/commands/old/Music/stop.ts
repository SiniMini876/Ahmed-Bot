import { Message } from "discord.js";
import Client from "../../../Client";
import { Command } from "../../../Interfaces";

export const command: Command = {
    name: "stop",
    description: "Stops the music",
    usage: "!stop",
    execute(client: Client, message: Message) {
        const queue = client.player.getQueue(message.guildId!);
        if (!queue || !queue.playing)
            return void message.reply({
                content: "❌ | No music is being played!",
            });
        queue.destroy();
        return void message.reply({ content: "🛑 | Stopped the player!" });
    },
};
