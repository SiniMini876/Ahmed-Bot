import { Player } from 'discord-player';
import { Collection, Message } from 'discord.js';
import dotenv from 'dotenv';
import Client from '../../Client';
import { Event } from '../../Interfaces';
dotenv.config();

const cooldowns = new Map();

export const event: Event = {
    name: 'messageCreate',
    execute: async (client: Client, message: Message) => {
        if (message.author.bot) return;
        if (!message.content.startsWith(client.prefix!)) {
            await (await import('../configuration/custom_words')).default(client, message);
            return;
        }

        const args: any = message.content
            .slice(client.prefix!.length)
            .split(/ +/);

        const cmd: string = (args.shift() as string).toLowerCase();

        const command =
            client.oldcommands.get(cmd) ||
            client.oldcommands.find(
                (cd) => cd.aliases! && cd.aliases.includes(cmd)
            );
        if (!command) return;
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }

        const current_time = Date.now();
        const time_stamps = cooldowns.get(command.name);
        const cooldown_amount = command.cooldown! * 1000 || 5000;

        if (time_stamps.has(message.author.id)) {
            const expiration_time =
                time_stamps.get(message.author.id) + cooldown_amount;

            if (current_time < expiration_time) {
                const time_left = (expiration_time - current_time) / 1000;

                return message.reply(
                    `Please wait ${time_left.toFixed(
                        1
                    )} more second(s) before reusing the \`${
                        command.name
                    }\` command.`
                );
            }
        }

        try {
            command.execute(client, message, args);
        } catch (err) {
            console.log(err);
            return message.channel.send(
                ` הייתה בעיה לבצע את הפקודה, אם תקלה זו חוזרת אנא פנה לסיני הגדול ` +
                    '<@474584102335676427>'
            );
        }
    },
};
