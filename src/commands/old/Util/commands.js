const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'commands',
	aliases: ['c'],
	category: 'info',
	description: 'Displays a full list of bot commands.',
	usage: 'commands',
	async execute(client, message){
		return getAll(client, message);
	}
};

async function getAll(client, message) {
	const embed = new MessageEmbed()
		.setColor(process.env.COLOR)
		.setTitle('Command List')
		.setThumbnail(client.user.avatarURL());

	const commands = client.commands.map(cmd => `\`${client.prefix + cmd.name}\``).join('\n');

	return message.channel.send(embed.setDescription('Use `' + (`${client.prefix}help <commandName>\` without the \`<>\` to see more information about a specific command.\n\n${commands}`)));
}