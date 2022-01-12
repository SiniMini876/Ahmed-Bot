import {
    CommandInteraction,
    Guild,
    GuildMember,
    MessageEmbed,
    TextChannel,
} from 'discord.js';
import { Lyrics } from '@discord-player/extractor';
const lyricsClient = Lyrics.init();
import Client from '../../../Client';
import { SlashCommand } from '../../../Interfaces';
export const command: SlashCommand = {
    name: 'lyrics',
    description: 'Showing the lyrics of the song',
    execute: async (
        client: Client,
        interaction: CommandInteraction,
        member: GuildMember,
        channel: TextChannel,
        guild: Guild
    ) => {
        const queue = client.player.getQueue(interaction.guildId!);
        if (!queue || !queue.playing)
            return void interaction.editReply({
                content: '❌ | No music is being played!',
            });

        const songName = queue.nowPlaying().title;
        const artistName = queue.nowPlaying().author;
        if (!songName) {
            return interaction.editReply("I couldn't find the song name!");
        }

        try {
            let lyrics = await lyricsClient.search(`${artistName} ${songName}`);

            let embed = new MessageEmbed()
            .setTitle(`${songName}`)
            .addField(`URL`, lyrics.url)
            .setThumbnail(lyrics.thumbnail)
            .setDescription(lyrics.lyrics!)
            .setAuthor(lyrics.artist)


            interaction.editReply({
                embeds: [embed]
            });
        } catch (e) {
            interaction.editReply('No lyrics found for ' + songName);
        }
    },
};
