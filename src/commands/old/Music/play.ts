import { QueryType } from 'discord-player';
import { GuildManager, GuildMember, Message, Sticker, User } from 'discord.js';
import yts from 'yt-search';
import Client from '../../../Client';
import { Command } from '../../../Interfaces';

export const command: Command = {
    name: 'play',
    cooldown: 5,
    aliases: ['p'],
    description: 'Plays audio from YouTube or Soundcloud',
    usage: '!p <name of the song or URL>',
    execute: async (client: Client, message: Message, args: string[]) => {
        const { channel } = message.member!.voice;
        if (!channel)
            return message
                .reply('You need to join a voice channel first!')
                .catch(console.error);
        if (!args.length)
            return message
                .reply(
                    `Usage: ${client.prefix}play <YouTube URL | Video Name | Soundcloud URL>`
                )
                .catch(console.error);

        const permissions = channel.permissionsFor(client.user!);
        if (!permissions!.has('CONNECT'))
            return message.reply(
                'Cannot connect to voice channel, missing permissions'
            );
        if (!permissions!.has('SPEAK'))
            return message.reply(
                'I cannot speak in this voice channel, make sure I have the proper permissions!'
            );

        const query = args.join(' ');

        let song: string;
        if (query?.search('https')) {
            const r = await yts(query!);
            song = r.videos[0].url;
        } else {
            song = query;
        }

        const searchResult = await client.player.search(song!, {
            requestedBy: message.member?.user as User,
            searchEngine: QueryType.AUTO,
        });

        if (!searchResult || !searchResult.tracks.length)
            return message.channel.send({
                content: `❌ | Track **${query}** not found!`,
            });

        const queue = await client.player.createQueue(message.guild!, {
            metadata: message,
        });

        try {
            if (!queue.connection)
                await queue.connect(message.member!.voice.channel!);
        } catch {
            client.player.deleteQueue(message.guildId!);
            return message.channel.send({
                content: 'Could not join your voice channel!',
            });
        }

        searchResult.playlist
            ? queue.addTracks(searchResult.tracks)
            : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();
    },
};
