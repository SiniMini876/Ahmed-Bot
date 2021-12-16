const { Player, QueryType, QueueRepeatMode } = require("discord-player");

module.exports = {
  name: "loop",
  aliases: ['l'],
  description: "Choose music loop",
  usage: "!loop <Off / Track / Queue / Autoplay>",
  execute(message) {
    const queue = client.player.getQueue(message.guildId);
    if (!queue || !queue.playing)
        return void message.reply({ content: "❌ | No music is being played!" });
    const loopMode = args[0]
    const success = queue.setRepeatMode(loopMode);
    const mode =
        loopMode === QueueRepeatMode.TRACK ? "🔂" : loopMode === QueueRepeatMode.QUEUE ? "🔁" : "▶";
    return void message.reply({
        content: success ? `${mode} | Updated loop mode!` : "❌ | Could not update loop mode!"
    });
  }
};
