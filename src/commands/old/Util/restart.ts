import { Message } from 'discord.js';
import Client from '../../../Client';
// import deploytoheroku from "../../../Functions/deploytoheroku";
import { Command } from '../../../Interfaces';

export const command: Command = {
    name: 'restart',
    cooldown: 60,
    usage: '!restart',
    description: 'The bot restarts, should take a couple of minutes',
    async execute(client: Client, message: Message, args: string[]) {
        message.channel
            .send('The bot will be online soon, wait like 3 minutes ✅')
            .then((m) => {
                process.exit(0);
            });
    },
};
