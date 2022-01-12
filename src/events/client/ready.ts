import express from 'express';
import { Player, Playlist, Queue, Track } from 'discord-player';
import Discord, { ApplicationCommandData, ClientUser, Message, User } from 'discord.js';
import Client from '../../Client';
import { Event } from '../../Interfaces';
import path from 'path';

const inter = Discord.CommandInteraction;

export const event: Event = {
    name: 'ready',
    execute: async (client: Client) => {
        // list slash commands
        await (await import("../../Functions/commands_handlers")).handler.execute(client)

        await (await import(`../../web/web`)).web.execute();

        client.user!.setActivity("להרביץ ליהודים")

        client.player

            .on('queueEnd', (queue: Queue) => {
                if (queue.metadata instanceof inter) {
                    queue.metadata.followUp('🎶 || The queue has ended!');
                } else {
                    (queue.metadata as Message).channel.send(
                        '🎶 || The queue has ended!'
                    );
                }
            })
            .on('trackAdd', (queue: Queue, track: Track) => {
                if (queue.metadata instanceof inter) {
                    if (queue.tracks.length === 1)
                        queue.metadata.editReply(
                            '🎶 || A track has added to the queue: ' +
                                track.title
                        );
                    else
                        queue.metadata.followUp(
                            '🎶 || A track has added to the queue: ' +
                                track.title
                        );
                } else {
                    if (queue.tracks.length === 1)
                        (queue.metadata as Message).channel.send(
                            '🎶 || A track has added to the queue: ' +
                                track.title
                        );
                    else
                        (queue.metadata as Message).channel.send(
                            '🎶 || A track has added to the queue: ' +
                                track.title
                        );
                }
            })

            .on('trackStart', async (queue: Queue, track: Track) => {
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
                let msg: Message;
                let msg2: Message;
                if (queue.metadata instanceof inter) {
                    msg = (await queue.metadata.followUp({
                        content: `Now playing ${track.title}...`,
                        components: [row],
                    })) as Message;
                    msg2 = (await queue.metadata.followUp({
                        content: `More buttons to control...`,
                        components: [row2],
                    })) as Message;
                } else {
                    msg = (await (queue.metadata as Message).channel.send({
                        content: `Now playing ${track.title}...`,
                        components: [row],
                    })) as Message;
                    msg2 = (await (queue.metadata as Message).channel.send({
                        content: `More buttons to control...`,
                        components: [row2],
                    })) as Message;
                }

                setTimeout(() => {
                    msg.delete();
                    msg2.delete();
                }, track.durationMS);
            });
    },
};
