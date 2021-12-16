const { canModifyQueue } = require("../../../Functions/canModifyQueue");
module.exports = {
    name: "time",
    description: "Set the timeline in the song",
    usage: "!time <seconds -- minute 3:14 === 194>",
    execute(message, args, client) {
        const queue = client.oldplayer.getQueue(message);

        const voice = message.member.voice.channel;
        if (!voice) {
            return message.reply("You need to join a voice channel first!");
        }

        if (!queue) {
            return message.reply("There is nothing playing!");
        }

        let time = args[0] * 1000;

        client.oldplayer.setPosition(message, time)

        return message.channel.send("<@" + message.author + ">" + " ⏹ stopped the music!");
    }
};
