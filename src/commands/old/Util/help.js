const Discord = require("discord.js");
const { Client, Util, MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  cooldown: 5,
  description: "The bot sends an help page, like this one.",
  async execute(bot, msg, args){ 

		if (args[1]) {
			return getCMD(bot, msg, args[1]);
		}
		else {
			return helpMSG(bot, msg);
		}
	},
};

async function helpMSG(client, message) {

	const embed = new MessageEmbed()
		.setColor(process.env.COLOR)
		.setTitle('אחמד - עזרה')
		.setThumbnail(client.user.avatarURL())
		.setDescription(`For a full list of commands, please type \`${client.prefix}commands\` \n\nTo see more info about a specific command, please type \`${client.prefix}help <command>\` without the \`<>\``)
		.addField('למה זה באנגלית?', 'דיסקורד לא תומך בצורה מלאה בעברית לכן סיני היקר שלנו כתב הכל באנגלית')
	message.channel.send(embed);
}

async function getCMD(client, message, input) {

	const cmd = client.commands.get(input.toLowerCase()) || client.commands.find(cd => cd.aliases && cd.aliases.includes(input));;

  let info = `No information found for command **${input.toLowerCase()}**\nTry find your command with the command \`!commands\` or \`!help\``;
  const em = new MessageEmbed().setTitle(message.author.username).setThumbnail(client.user.avatarURL()).setTimestamp();

	if (!cmd) {
		return message.channel.send(em.setColor('#ff0000').setDescription(info));
  }
  
  const embed = new MessageEmbed().setTitle(`${cmd.name} - ${message.author.username}`).setThumbnail(client.user.avatarURL()).setTimestamp();

	if (cmd.name) info = `**Command Name**: \`${cmd.name}\``;
	if (cmd.aliases) info += `\n**Aliases**: \`${cmd.aliases.join(', ')}\``;
	if (cmd.description) info += `\n**Description**: ${cmd.description}`;
	if (cmd.usage) {
		info += `\n**Usage**: ${client.prefix}${cmd.usage}`;
		embed.setFooter('<> = REQUIRED | [] = OPTIONAL');
	}
	if (cmd.usage2) info += `\n**Usage 2**: ${client.prefix}${cmd.usage2}`;

	return message.channel.send(embed.setColor(process.env.COLOR).setDescription(info));

}