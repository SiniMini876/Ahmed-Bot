import { Message } from "discord.js";
import Client from "../../../Client";
import { Command } from "../../../Interfaces";

export const command: Command = {
    name: "volume",
    aliases: ["vol"],
    description: "Change volume of currently playing music",
    usage: "!vol <0 - basicly infinity but I recommend 200>",
    execute(client: Client, message: Message, args: string[]) {
        const queue = client.player.getQueue(message.guildId!);
        if (!queue || !queue.playing)
            return void message.reply({
                content: "❌ | No music is being played!",
            });

        const vol = parseInt(args[0]);
        if (!vol)
            return void message.reply({
                content: `🎧 | Current volume is **${queue.volume}**%!`,
            });
        if (vol < 0 || vol > 100)
            return void message.reply({
                content: "❌ | Volume range must be 0-100",
            });
        const success = queue.setVolume(vol);
        return void message.reply({
            content: success
                ? `✅ | Volume set to **${vol}%**!`
                : "❌ | Something went wrong!",
        });
    },
};
