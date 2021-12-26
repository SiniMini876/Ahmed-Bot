const { canModifyQueue } = require("../../../Functions/canModifyQueue");
module.exports = {
    name: "stop",
    description: "Stops the music",
    usage: "!stop",
    execute(message, args, client) {
        const queue = client.player.getQueue(message.guildId);
        if (!queue || !queue.playing) return void message.reply({ content: "❌ | No music is being played!" });
        queue.destroy();
        return void message.reply({ content: "🛑 | Stopped the player!" });
    }
};
