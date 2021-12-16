const { canModifyQueue } = require("../../../Functions/canModifyQueue");
module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "Skip the currently playing song",
  usage: "!skip",
  execute(message, args, client) {
    const queue = client.player.getQueue(message.guildId);
    if (!queue || !queue.playing)
        return void message.reply({ content: "❌ | No music is being played!" });
    const currentTrack = queue.current;
    const success = queue.skip();
    return void message.reply({
        content: success ? `✅ | Skipped **${currentTrack}**!` : "❌ | Something went wrong!"
    });
  }
};
