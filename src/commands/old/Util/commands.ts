import { Message, MessageEmbed, MessageEmbedOptions, User } from 'discord.js';
import Client from '../../../Client';
import { Command } from '../../../Interfaces';

export const command: Command = {
    name: 'commands',
    description: 'Displays a full list of bot commands.',
    usage: 'commands',
    async execute(client: Client, message: Message, args: string[]) {
        return getAll(client, message);
    },
};

async function getAll(client: Client, message: Message) {
    const commands = client.oldcommands
        .map((cmd: any) => `\`${client.prefix + cmd.name}\``)
        .join('\n');

    const embed = new MessageEmbed()
        .setTitle('Command List')
        .setThumbnail((client.user as User).avatarURL() as string)
        .setDescription(
            'Use `' +
                `${client.prefix}help <commandName>\` without the \`<>\` to see more information about a specific command.\n\n${commands}`
        ) as MessageEmbedOptions;

    return message.channel.send({ embeds: [embed] });
}
