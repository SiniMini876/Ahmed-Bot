
module.exports = {
    name: "resume",
    description: "Resume currently playing music",
    execute(client, interaction, member, channel, guild) {
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing)
            return void interaction.editReply({ content: "❌ | No music is being played!" });

        // Gets the current song
        const success = queue.setPaused(false)
        return void interaction.editReply({
            content: success ? `✅ | The music is now resumed!` : "❌ | Something went wrong!"
        });
    }
};
