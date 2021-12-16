const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "np",
    description: "Show now playing song",
    usage: "!np",
    async execute(message, args, client) {
        const queue = client.player.getQueue(message.guildId);
        if (!queue || !queue.playing)
            return void message.reply({ content: "❌ | No music is being played!" });

        const progress = queue.createProgressBar();
        const perc = queue.getPlayerTimestamp();

        return void message.reply({
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
