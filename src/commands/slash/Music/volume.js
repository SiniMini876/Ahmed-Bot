
module.exports = {
    name: "volume",
    description: "Change volume of currently playing music",
    execute(client, interaction, member, channel, guild) {
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing)
            return void interaction.editReply({ content: "❌ | No music is being played!" });

        const vol = interaction.options.get("amount");
        if (!vol)
            return void interaction.editReply({ content: `🎧 | Current volume is **${queue.volume}**%!` });
        if (vol.value < 0 || vol.value > 100)
            return void interaction.editReply({ content: "❌ | Volume range must be 0-100" });
        const success = queue.setVolume(vol.value);
        return void interaction.editReply({
            content: success ? `✅ | Volume set to **${vol.value}%**!` : "❌ | Something went wrong!"
        });
    }
};
