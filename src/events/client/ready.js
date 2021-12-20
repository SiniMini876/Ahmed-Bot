const express = require('express');
const app = express();
const port = 5000;
const inter = require('discord.js').Interaction;

module.exports = async (Discord, client) => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Ahmed is running on port ${PORT}`);
    });

    client.user.setActivity('להרביץ ליהודים', { type: 'PLAYING' });

    client.player

        .on('noResults', (queue, playlist) => {
            if (queue.metadata instanceof inter) {
                return queue.metadata.followUp({
                    content: `Unfortunatly I couldn't find something related to ${query}... Try doing it again`,
                    ephemeral: true,
                });
            } else
                return queue.metadata.channel.send({
                    content: `Unfortunatly I couldn't find something related to ${query}... Try doing it again`,
                });
        })

        .on('playlistStart', (queue, playlist, track) => {
            if (queue.metadata instanceof inter) {
                queue.metadata.followUp(
                    '✅  | ' +
                        'Playing playlist: ' +
                        playlist.title +
                        ' 🎶 ' +
                        track.title
                );
            } else {
                queue.metadata.channel.send(
                    '✅  | ' +
                        'Playing playlist: ' +
                        playlist.title +
                        ' 🎶 ' +
                        track.title
                );
            }
        })

        .on('queueEnd', (queue) => {
            if (queue.metadata instanceof inter) {
                queue.metadata.followUp('🎶 || The queue has ended!');
            } else {
                queue.metadata.channel.send('🎶 || The queue has ended!');
            }
        })
        .on('playlistAdd', (queue, playlist) => {
            if (queue.metadata instanceof inter) {
                queue.metadata.followUp('🎶 || Added playlist to the queue:');
            } else {
                queue.metadata.channel.send(
                    '🎶 || Added playlist to the queue:'
                );
            }
        })
        .on('trackAdd', (queue, track) => {
            if (queue.metadata instanceof inter) {
                if (queue.tracks.length === 1)
                    queue.metadata.editReply(
                        '🎶 || A track has added to the queue: ' + track.title
                    );
                else
                    queue.metadata.followUp(
                        '🎶 || A track has added to the queue: ' + track.title
                    );
            } else {
                if (queue.tracks.length === 1)
                    queue.metadata.channel.send(
                        '🎶 || A track has added to the queue: ' + track.title
                    );
                else
                    queue.metadata.channel.send(
                        '🎶 || A track has added to the queue: ' + track.title
                    );
            }
        })

        .on('trackStart', async (queue, track) => {
            let playBUT = new Discord.MessageButton()
                .setStyle('PRIMARY')
                .setEmoji('▶')
                .setCustomId('play');
            let skipBUT = new Discord.MessageButton()
                .setStyle('PRIMARY')
                .setEmoji('⏭')
                .setCustomId('skip');
            let muteBUT = new Discord.MessageButton()
                .setStyle('PRIMARY')
                .setEmoji('🔇')
                .setCustomId('mute');
            let volDownBUT = new Discord.MessageButton()
                .setStyle('PRIMARY')
                .setEmoji('🔉')
                .setCustomId('volDown');
            let volUpBUT = new Discord.MessageButton()
                .setStyle('PRIMARY')
                .setEmoji('🔊')
                .setCustomId('volUp');
            let stopBUT = new Discord.MessageButton()
                .setStyle('PRIMARY')
                .setEmoji('⏹')
                .setCustomId('stop');
            let pauBUT = new Discord.MessageButton()
                .setStyle('PRIMARY')
                .setEmoji('⏸')
                .setCustomId('pause');

            let row = new Discord.MessageActionRow().addComponents(
                playBUT,
                pauBUT,
                volUpBUT,
                volDownBUT
            );
            let row2 = new Discord.MessageActionRow().addComponents(
                skipBUT,
                muteBUT,
                stopBUT
            );
            let msg;
            let msg2;
            if (queue.metadata instanceof inter) {
                msg = await queue.metadata.followUp({
                    content: `Now playing ${track.title}...`,
                    components: [row],
                });
                msg2 = await queue.metadata.followUp({
                    content: `More buttons to control...`,
                    components: [row2],
                });
            } else {
                msg = await queue.metadata.channel.send({
                    content: `Now playing ${track.title}...`,
                    components: [row],
                });
                msg2 = await queue.metadata.channel.send({
                    content: `More buttons to control...`,
                    components: [row2],
                });
            }

            setTimeout(() => {
                msg.delete();
                msg2.delete();
            }, track.durationMS);
        });
};
