module.exports = {
    name: "shuffle",
    description: "Shuffle queue",
    execute(client, interaction, member, channel, guild) {
        const queue = client.player.getQueue(interaction.guildId);

        const voice = interaction.member.voice.channel;
        if (!voice) {
            return interaction.editReply("You need to be in a voice channel!");
        }

        if (!queue) {
            return interaction.editReply("There is nothing playing!");
        }

        client.player.shuffle();
    }
};
