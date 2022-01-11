import { Message, Sticker } from "discord.js";
import Client from "../../../Client";
import { Command } from "../../../Interfaces";

export const command: Command = {
    name: 'resume',
    aliases: ['r'],
    description: 'Resume currently playing music',
    usage: '!resume',
    async execute(client: Client, message: Message, args: string[]) {
        const queue = client.player.getQueue(message.guildId!);
        if (!queue || !queue.playing)
            return void message.reply({
                content: '❌ | No music is being played!',
            });

        // Gets the current song
        const success = queue.setPaused(false);
        return void message.reply({
            content: success
                ? `✅ | The music is now resumed!`
                : '❌ | Something went wrong!',
        });
    },
};
