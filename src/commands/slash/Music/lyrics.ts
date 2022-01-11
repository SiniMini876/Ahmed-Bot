import {
    CommandInteraction,
    Guild,
    GuildMember,
    TextChannel,
} from 'discord.js';
const lyricsParse = require('lyrics-finder');
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
            let lyrics =
                (await lyricsParse(artistName, songName)) || 'Not Found!';

            interaction.editReply(
                `__**Lyrics for ${songName} made by ${artistName}**__\n\`\`\`${lyrics}\`\`\``
            );
        } catch (e) {
            console.log(e);
            interaction.editReply('No lyrics found for ' + songName);
        }
    },
};
