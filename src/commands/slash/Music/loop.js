const { Player, QueryType, QueueRepeatMode } = require("discord-player");

module.exports = {
    name: "loop",
    description: "Toggle music loop",
    execute(client, interaction, member, channel, guild) {
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing)
            return void interaction.editReply({ content: "❌ | No music is being played!" });
        const loopMode = interaction.options.get("mode").value;
        const success = queue.setRepeatMode(loopMode);
        const mode =
            loopMode === QueueRepeatMode.TRACK ? "🔂" : loopMode === QueueRepeatMode.QUEUE ? "🔁" : "▶";
        return void interaction.editReply({
            content: success ? `${mode} | Updated loop mode!` : "❌ | Could not update loop mode!"
        });
    }
};
