const Discord = require("discord.js")
module.exports = {
    name: "ping",
    description: "pinging the bot, shows latency",
    async execute(client, interaction, member, channel, guild) {
        const reply1 = await interaction.editReply({
            content: "🏓 Pinging...",
            fetchReply: true,
            ephemeral: true
        });

        const embed = new Discord.MessageEmbed()
            .setColor(process.env.COLOR)
            .setTitle("🏓 Pong!")
            .setDescription(
                `Bot Latency is **${Math.floor(
                    reply1.createdTimestamp - interaction.createdTimestamp
                )} ms** \nAPI Latency is **${Math.round(client.ws.ping)} ms**`
            );

        interaction.editReply({embeds: [embed]});
    }
};
