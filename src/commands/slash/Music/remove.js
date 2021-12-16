
module.exports = {
    name: "remove",
    description: "Remove song from the queue",
    usage: "!remove <the number of the song in the queue or the exact name>",
    execute(client, interaction, member, channel, guild) {
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing)
            return void interaction.editReply({ content: "❌ | No music is being played!" });

        const track = interaction.options.getNumber("tracknumber")

        if(!track) return interaction.editReply("You have to specify which song do you want to remove from the queue -- !remove <1, 2, 3 or the exact name of the track -- check it with /queue>")

        queue.remove(track)

        interaction.editReply(`✅ | Track ${track} has been removed from the queue!`)

    }
};
