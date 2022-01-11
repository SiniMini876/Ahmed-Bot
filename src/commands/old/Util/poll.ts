import { Message } from "discord.js";
import Client from "../../../Client";
import { Command } from "../../../Interfaces";

export const command: Command = {
    name: 'poll',
    aliases: [''],
    cooldown: 5,
    description: 'הבוט פותח סקר',
    usage: 'poll <the poll title>',
    async execute(client: Client, message: Message, args: string[]) {
        if (args[1]) {
            let msgArgs = args.slice(1).join(' ');
            message.channel
                .send('📋 ' + '**' + msgArgs + '**')
                .then((messageReaction) => {
                    messageReaction.react('👍');
                    messageReaction.react('👎');
                    message.delete()
                });
        }
    },
};
