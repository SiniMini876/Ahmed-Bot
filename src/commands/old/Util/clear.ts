import { GuildMember, Message, TextChannel } from "discord.js";
import Client from "../../../Client";
import { Command } from "../../../Interfaces";

export const command: Command = {
    name: "clear",
    aliases: ["c"],
    cooldown: 10,
    usage: "!clear `<number of messages>`",
    description: "The bot deletes x messages.",
    async execute(client: Client, message: Message, args: string[]) {
        if (!(message.member as GuildMember).permissions.has("MANAGE_MESSAGES"))
            return message.channel.send(
                "סורי אחי, אין לך רשות לעשות מעשה שכזה. יבומר"
            );
        if (!args[1]) return message.channel.send("תגיד כמה הודעות למחוק יאפס");
        (message.channel as TextChannel)
            .bulkDelete(parseInt(args[1]))
            // eslint-disable-next-line no-console
            .catch(console.error);
    },
};
