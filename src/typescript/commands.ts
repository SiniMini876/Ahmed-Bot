import { MessageEmbed } from "discord.js";

export default {
    name: 'commands',
	aliases: ['c'],
	category: 'info',
	description: 'Displays a full list of bot commands.',
	usage: 'commands',
    execute: async (client, message) => {
		return getAll(client, message);
	}
}

function getAll(client, message) {
	const embed = new MessageEmbed()
		.setColor("#random")
		.setTitle('Command List')
		.setThumbnail(client.user.avatarURL());

	const commands = client.commands.map(cmd => `\`${client.prefix + cmd.name}\``).join('\n');

	return message.channel.send(embed.setDescription('Use `' + (`${client.prefix}help <commandName>\` without the \`<>\` to see more information about a specific command.\n\n${commands}`)));
}