import { Message } from "discord.js";
import Client from "../../../Client";
import { Command } from "../../../Interfaces";

export const command: Command = {
    name: "back",
    aliases: ["b"],
    description: "Plays previous song!",
    usage: "!back",
    execute(client: Client, message: Message) {
        const queue = client.player.getQueue(message.guildId!);
        if (!queue || !queue.playing)
            return void message.reply({
                content: "❌ | No music is being played!",
            });

        queue.back();
    },
};
