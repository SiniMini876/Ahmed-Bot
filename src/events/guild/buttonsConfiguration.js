require("dotenv").config();

module.exports = async(Discord, client, interaction) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (interaction.customId === "play") {
        queue.setPaused(false);
        interaction.reply(`<@${interaction.member.id}> ▶ resumed the music!`);
        setTimeout(() => {
            interaction.deleteReply();
        }, 5000);
    }
    if (interaction.customId === "pause") {
        queue.setPaused(true);
        interaction.reply(`<@${interaction.member.id}> ⏸ paused the music.`);
        setTimeout(() => {
            interaction.deleteReply();
        }, 5000);
    }
    if (interaction.customId === "skip") {
        queue.skip();
        interaction.reply(`<@${interaction.member.id}> ⏭ resumed the music!`);
        setTimeout(() => {
            interaction.deleteReply();
        }, 5000);
    }
    if (interaction.customId === "mute") {
        if (queue.volume <= 0) {
            queue.setVolume(100);
            interaction.reply(`<@${interaction.member.id}> 🔊 unmuted the music!`);
            setTimeout(() => {
                interaction.deleteReply();
            }, 5000);
        } else {
            queue.setVolume(0);
            interaction.reply(`<@${interaction.member.id}> 🔇 muted the music!`);
            setTimeout(() => {
                interaction.deleteReply();
            }, 5000);
        }
    }
    if (interaction.customId === "volDown") {
        let calVol = queue.volume - 10;
        if (calVol <= 0) {
            calVol = 0;
            queue.setVolume(0);
        } else queue.setVolume(calVol);
        interaction.reply(
            `<@${interaction.member.id}> 🔉 decreased the volume, the volume is now ${calVol}%`
        );
        setTimeout(() => {
            interaction.deleteReply();
        }, 5000);
    }
    if (interaction.customId === "volUp") {
        let newVol = queue.volume + 10;
        if (newVol >= 200) {
            newVol = 200;
            queue.setVolume(200);
        }
        queue.setVolume(newVol);
        interaction.reply(
            `<@${interaction.member.id}> 🔊 increased the volume, the volume is now ${newVol}%`
        );
        setTimeout(() => {
            interaction.deleteReply();
        }, 5000);
    }
    if (interaction.customId === "stop") {
        queue.stop();
        interaction.reply(`<@${interaction.member.id}> ⏹ stopped the music!`);
        setTimeout(() => {
            interaction.deleteReply();
        }, 5000);
    }
};
