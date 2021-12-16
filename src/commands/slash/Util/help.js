const Discord = require("discord.js");
const { Client, Util, MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    name: "help",
    description: "The bot sends an help page, like this one.",
    async execute(client, interaction, member, channel, guild) {
        const embed = new MessageEmbed()
            .setColor(process.env.COLOR)
            .setTitle("אחמד & אלון - Support")
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(
                `So Discord published recently a new way to configure commands with Discord bots, To check out all of the commands you can just type \`/\` and you will see a bunch of commands and explanations on what they do. I hope you understand it because it way easier to control the bot.`
            )
            .addField(
                "למה זה באנגלית?",
                "דיסקורד לא תומך בצורה מלאה בעברית לכן סיני היקר שלנו כתב הכל באנגלית"
            );

        interaction.editReply({embeds: [embed]})
    }
};