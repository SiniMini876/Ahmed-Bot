import { Message } from "discord.js";
import Client from "../../../Client";
import { Command } from "../../../Interfaces";

export const command: Command = {
    name: "loop",
    aliases: ["l"],
    description: "Choose music loop",
    usage: "!loop <Off / Track / Queue / Autoplay>",
    execute(client: Client, message: Message, args: string[]) {
        const queue = client.player.getQueue(message.guildId!);
        if (!queue || !queue.playing)
            return void message.reply({
                content: "❌ | No music is being played!",
            });
        const loopMode = args[0] as any;
        const success = queue.setRepeatMode(loopMode);
        let track: string = "Track";
        let Queue: string = "Queue";
        const mode =
            loopMode === track ? "🔂" : loopMode === Queue ? "🔁" : "▶";
        return void message.reply({
            content: success
                ? `${mode} | Updated loop mode!`
                : "❌ | Could not update loop mode!",
        });
    },
};
