
module.exports = {
    name: "stop",
    description: "Stops the music",
    execute(client, interaction, member, channel, guild) {
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return void interaction.editReply({ content: "❌ | No music is being played!" });
        queue.destroy();
        return void interaction.editReply({ content: "🛑 | Stopped the player!" });
    }
};
