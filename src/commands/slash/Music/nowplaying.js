const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "np",
    description: "Show now playing song",
    usage: "!np",
    execute(client, interaction, member, channel, guild) {
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing)
            return void interaction.editReply({ content: "❌ | No music is being played!" });

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return void interaction.editReply({
            embeds: [
                {
                    title: "Now Playing",
                    description: `🎶 | **${queue.current.title}**! (\`${perc.progress}%\`)`,
                    fields: [
                        {
                            name: "\u200b",
                            value: progress
                        }
                    ],
                    color: 0xffffff
                }
            ]
        });
    }
};
