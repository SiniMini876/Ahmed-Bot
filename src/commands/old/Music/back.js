const { canModifyQueue } = require("../../../Functions/canModifyQueue");

module.exports = {
  name: "back",
  aliases: ['b'],
  description: "Plays previous song!",
  usage: "!back",
  execute(message) {
    const queue = client.player.getQueue(message.guildId);
    if (!queue || !queue.playing)
        return void message.reply({ content: "❌ | No music is being played!" });

    queue.back()

  }
};
