const { Player, QueryType, QueueRepeatMode } = require("discord-player");

module.exports = {
    name: "play",
    description: "Plays audio from YouTube or Soundcloud",
    async execute(client, interaction, member, channel, guild) {
        const query = interaction.options.getString("query");
        const searchResult = await client.player
            .search(query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            .catch(() => {});
        if (!searchResult || !searchResult.tracks.length) return void interaction.editReply({ content: "No results were found!" });

        const queue = await client.player.createQueue(guild, {
            metadata: interaction
        });

        try {
            if (!queue.connection) await queue.connect(member.voice.channel);
        } catch {
            void client.player.deleteQueue(interaction.guildId);
            return void interaction.editReply({ content: "Could not join your voice channel!" });
        }

        searchResult.playlist ? queue.addTracks(searchResult.tracks) : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();
    }
};
