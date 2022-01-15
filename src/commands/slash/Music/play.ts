import { Player, QueryType, QueueRepeatMode } from 'discord-player';
import {
    CommandInteraction,
    GuildMember,
    TextChannel,
    Guild,
} from 'discord.js';
import Client from '../../../Client';
import { SlashCommand } from '../../../Interfaces';
// import yts from 'yt-search';

export const command: SlashCommand = {
    name: 'play',
    description:
        'Play audio from YouTube, Spotify, Apple Music (Can take a long time for long playlists), SC and mp3',
    options: [
        {
            name: 'query',
            type: 'STRING',
            description: 'The song you want to play',
            required: true,
        },
    ],
    async execute(
        client: Client,
        interaction: CommandInteraction,
        member: GuildMember,
        channel: TextChannel,
        guild: Guild
    ) {
        const query = interaction.options.getString('query') as string;

        const searchResult = await client.player.search(query!, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        if (!searchResult || !searchResult.tracks.length)
            return interaction.editReply({
                content: `❌ | Track **${query}** not found!`,
            });

        let queue = await client.player.getQueue(interaction.guild!);

        if (!queue) {
            queue = await client.player.createQueue(interaction.guild!, {
                metadata: interaction,
            });
        } else {
            queue.metadata = interaction;
        }

        try {
            if (!queue.connection) await queue.connect(member.voice.channel!);
        } catch {
            client.player.deleteQueue(interaction.guildId!);
            return interaction.editReply({
                content: 'Could not join your voice channel!',
            });
        }

        searchResult.playlist
            ? queue.addTracks(searchResult.tracks)
            : queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();
    },
};
