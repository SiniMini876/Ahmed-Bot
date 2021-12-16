const { MessageEmbed, MessageAttachment } = require("discord.js");
const FiltersList = require("../../../assets/filters.json");

module.exports = {
    name: "filter",
    aliases: ["fil"],
    description: "Set filters for songs",
    usage: "!fil <filter>",
    async execute(message, args, client) {
        const queue = client.player.getQueue(message.guildId);
        if (!queue || !queue.playing)
            return void message.channel.send({ content: "❌ | No music is being played!" });
        const filter = args.join(" ")
        if (filter === "bassboost") {
            await queue.setFilters({
                bassboost: !queue.getFiltersEnabled().includes("bassboost"),
                normalizer2: !queue.getFiltersEnabled().includes("bassboost") // because we need to toggle it with bass
            });
        }
        await queue.setFilters({
            [filter]: !queue.getFiltersEnabled().includes(filter)
        });

        message.reply(
            `✅ | The filter ${filter} has been ${
                queue.getFiltersEnabled().includes(filter) ? "Enabled" : "Disabled"
            }!`
        );
    }
};
