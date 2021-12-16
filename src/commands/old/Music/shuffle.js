const { canModifyQueue } = require("../../../Functions/canModifyQueue");
module.exports = {
  name: "shuffle",
  description: "Shuffle queue",
  usage: "!shuffle",
  execute(message, args, client) {

    const queue = client.player.getQueue(message.guildId);

    const voice = message.member.voice.channel;
    if (!voice) {
        return message.reply("You need to be in a voice channel!");
    }

    if (!queue) {
        return message.reply("There is nothing playing!");
    }
    
    queue.player.shuffle()

  }
};
