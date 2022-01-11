import { Message, MessageEmbed, MessageEmbedOptions } from 'discord.js';
import Client from '../../../Client';
import { Command } from '../../../Interfaces';

export const command: Command = {
    name: 'help',
    aliases: ['h'],
    cooldown: 5,
    description: 'The client sends an help page, like this one.',
    async execute(client: Client, message: Message, args: string[]) {
        if (args[1]) {
            return getCMD(client, message, args[1]);
        } else {
            return helpMSG(client, message);
        }
    },
};

async function helpMSG(client: Client, message: Message) {
    const embed = new MessageEmbed()
        .setTitle('אחמד - עזרה')
        .setThumbnail(client.user!.avatarURL()!)
        .setDescription(
            `For a full list of commands, please type \`${client.prefix}commands\` \n\nTo see more info about a specific command, please type \`${client.prefix}help <command>\` without the \`<>\``
        )
        .addField(
            'למה זה באנגלית?',
            'דיסקורד לא תומך בצורה מלאה בעברית לכן סיני היקר שלנו כתב הכל באנגלית'
        );
    message.channel.send({ embeds: [embed] });
}

async function getCMD(client: Client, message: Message, input: string) {
    const cmd =
        client.oldcommands.get(input.toLowerCase()) ||
        client.oldcommands.find((cd: any) => cd.aliases && cd.aliases.includes(input));

    let info = `No information found for command **${input.toLowerCase()}**\nTry find your command with the command \`!commands\` or \`!help\``;
    const em = new MessageEmbed()
        .setTitle(message.author.username)
        .setThumbnail(client.user!.avatarURL()!)
        .setTimestamp();

    if (!cmd) {
        em.setColor('#ff0000').setDescription(info)
        return message.channel.send(
            {
                embeds: [em]
            }
        );
    }

    const embed = new MessageEmbed()
        .setTitle(`${cmd.name} - ${message.author.username}`)
        .setThumbnail(client.user!.avatarURL()!)
        .setTimestamp();

    if (cmd.name) info = `**Command Name**: \`${cmd.name}\``;
    if (cmd.aliases) info += `\n**Aliases**: \`${cmd.aliases.join(', ')}\``;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${client.prefix}${cmd.usage}`;
        embed.setFooter('<> = REQUIRED | [] = OPTIONAL');
    }
    return message.channel.send({ embeds: [embed.setDescription(info)]});
}
