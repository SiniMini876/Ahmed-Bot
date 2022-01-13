import { Player, QueryType, QueueRepeatMode, Track } from 'discord-player';
import {
    CommandInteraction,
    GuildMember,
    TextChannel,
    Guild,
} from 'discord.js';
import Client from '../../../Client';
import { SlashCommand } from '../../../Interfaces';
import radio from '../../../assets/radio.json';
import { isRegExp } from 'util/types';
// import yts from 'yt-search';

export const command: SlashCommand = {
    name: 'radio',
    description: 'Plays a radio station, only the station that I included',
    options: [
        {
            name: 'stationname',
            type: 'STRING',
            description: 'The radio station',
            required: true,
            choices: [
                {
                    name: 'ECO 99FM',
                    value: 'ECO 99FM',
                },
                {
                    name: 'Radios100FM',
                    value: 'Radios100FM',
                },
                {
                    name: 'Kan  88FM',
                    value: 'Kan 88FM',
                },
                {
                    name: 'Galei Zahal',
                    value: 'Galei Zahal',
                },
                {
                    name: 'GLGLZ',
                    value: 'GLGLZ',
                },
                {
                    name: '103FM',
                    value: '103FM',
                },
                {
                    name: 'KanReshet ב',
                    value: 'KanReshet ב',
                },
            ],
        },
    ],
    async execute(
        client: Client,
        interaction: CommandInteraction,
        member: GuildMember,
        channel: TextChannel,
        guild: Guild
    ) {
        const station_name = interaction.options.getString(
            'stationname'
        )! as keyof typeof radio;

        let radio_station = radio[station_name] as any;

        const station_url = radio_station['url'];

        const searchResult = await client.player.search(station_url!, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });

        if (!searchResult || !searchResult.tracks.length)
            return interaction.editReply({
                content: `❌ | Station **${station_name}** not found!`,
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

        let track = searchResult.tracks[0];
        track.title = station_name;
        track.author = station_name;
        track.thumbnail = radio_station['thumbnail'];
        track.description = radio_station['homepage'];

        queue.addTrack(searchResult.tracks[0]);
        if (!queue.playing) await queue.play();
    },
};
