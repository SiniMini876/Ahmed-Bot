import { Message, Sticker } from "discord.js";
import Client from "../../../Client";
import { Command } from "../../../Interfaces";

export const command: Command = {
    name: 'stop',
    description: 'Stops the music',
    usage: '!stop',
    execute(client: Client, message: Message, args: string[]) {
        const queue = client.player.getQueue(message.guildId!);
        if (!queue || !queue.playing)
            return void message.reply({
                content: '❌ | No music is being played!',
            });
        queue.destroy();
        return void message.reply({ content: '🛑 | Stopped the player!' });
    },
};
