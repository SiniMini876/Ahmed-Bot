module.exports = {
    name: "pause",
    description: "Pause the currently playing music",

    async execute(client, interaction, member, channel, guild) {
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing)
            return void interaction.editReply({ content: "❌ | No music is being played!" });

        const success = queue.setPaused(true)
        return void interaction.editReply({
            content: success ? `✅ | The music is now paused!` : "❌ | Something went wrong!"
        });
    }
};
