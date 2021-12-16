const { MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    name: "filter",
    description: "Set filters for songs",
    async execute(client, interaction, member, channel, guild) {
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing)
            return void interaction.followUp({ content: "❌ | No music is being played!" });
        const filter = interaction.options.getString("filter")
        if(filter === "bassboost"){
            await queue.setFilters({
                bassboost: !queue.getFiltersEnabled().includes("bassboost"),
                normalizer2: !queue.getFiltersEnabled().includes("bassboost") // because we need to toggle it with bass
            });
        }
        await queue.setFilters({
            [filter]: !queue.getFiltersEnabled().includes(filter),
        });

        interaction.editReply(`✅ | The filter ${filter} has been ${queue.getFiltersEnabled().includes(filter) ? "Enabled" : "Disabled"}!`)
    }
};
