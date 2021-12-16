const { canModifyQueue } = require("../../../Functions/canModifyQueue");

module.exports = {
    name: "remove",
    description: "Remove song from the queue",
    usage: "!remove <the number of the song in the queue or the exact name>",
    execute(message, args, client) {
        const queue = client.player.getQueue(message.guildId);
        if (!queue || !queue.playing)
            return void message.reply({ content: "❌ | No music is being played!" });

        const track = args[0]

        if(!track) return message.reply("You have to specify which song do you want to remove from the queue -- !remove <1, 2, 3 or the exact name of the track -- check it with /queue>")

        queue.remove(track)

        message.reply(`✅ | Track ${track} has been removed from the queue!`)


    }
};
