import { Message, MessageEmbed } from 'discord.js';
import Client from '../../../Client';
import { Command } from '../../../Interfaces';
import { Lyrics } from '@discord-player/extractor';
const lyricsClient = Lyrics.init();

export const command: Command = {
    name: 'back',
    aliases: ['b'],
    description: 'Plays previous song!',
    usage: '!back',
    execute: async(client: Client, message: Message, args: string[]) => {
        const queue = client.player.getQueue(message.guildId!);
        if (!queue || !queue.playing)
            return void message.reply({
                content: '❌ | No music is being played!',
            });

        const songName = queue.nowPlaying().title;
        const artistName = queue.nowPlaying().author;
        if (!songName) {
            return message.reply("I couldn't find the song name!");
        }

        let lyrics = await lyricsClient.search(`${artistName} ${songName}`);

        let embed = new MessageEmbed()
        .setTitle(`${songName}`)
        .addField(`URL`, lyrics.url)
        .setThumbnail(lyrics.thumbnail)
        .setDescription(lyrics.lyrics!)
        .setAuthor(lyrics.artist)


        message.channel.send({
            embeds: [embed]
        });
    },
};
