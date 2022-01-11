import { GuildManager, GuildMember, Message } from "discord.js";
import Client from "../../../Client";
import { Command } from "../../../Interfaces";

export const command: Command = {
    name: 'shuffle',
    description: 'Shuffle queue',
    usage: '!shuffle',
    execute(client: Client, message: Message, args: string[]) {
        const queue = client.player.getQueue(message.guildId!);
        let member = message.member as GuildMember
        const voice = (member).voice.channel;
        if (!voice) {
            return message.reply('You need to be in a voice channel!');
        }

        if (!queue) {
            return message.reply('There is nothing playing!');
        }

        queue.shuffle();
    },
};
