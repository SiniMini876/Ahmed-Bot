import { QueueRepeatMode } from "discord-player";
import {
    ApplicationCommandData,
    ClientApplication,
    Guild,
    Message,
    User,
} from "discord.js";
import Client from "../../../Client";
import { Command } from "../../../Interfaces";

export const command: Command = {
    name: "deploy",
    async execute(client: Client, message: Message) {
        if (!client.application?.owner) await client.application?.fetch();

        let owner = client.application?.owner as User;

        if (message.author.id === owner.id) {
            const data: ApplicationCommandData[] = [
                {
                    name: "activity",
                    description: "Let's you create an Activity in a VC!",
                    options: [
                        {
                            name: "channel",
                            description: "The VC that the bot will activate",
                            required: true,
                            type: "CHANNEL",
                        },
                        {
                            name: "activity",
                            description: "Which activity do you want to play.",
                            required: true,
                            type: "STRING",
                            choices: [
                                {
                                    value: "755827207812677713",
                                    name: "Poker Night",
                                },
                                {
                                    value: "773336526917861400",
                                    name: "Betrayal.io",
                                },
                                // {
                                //     value: '755600276941176913',
                                //     name: 'YouTube Together',
                                // },
                                {
                                    value: "814288819477020702",
                                    name: "Fishington.io",
                                },
                                {
                                    value: "832012774040141894",
                                    name: "Chess in the Park",
                                },
                                {
                                    value: "880218394199220334",
                                    name: "Watch Together",
                                },
                                {
                                    value: "878067389634314250",
                                    name: "Doodle Crew",
                                },
                                {
                                    value: "879863686565621790",
                                    name: "Letter Tile",
                                },
                                {
                                    value: "879863976006127627",
                                    name: "Word Snacks",
                                },
                            ],
                        },
                    ],
                },
                {
                    name: "createroom",
                    description:
                        "Let's you create a unique room just for you and the number of people you set!",
                    options: [
                        {
                            name: "maximumpeople",
                            description:
                                "The maximum amount of people that can join!",
                            required: true,
                            type: "NUMBER",
                        },
                    ],
                },
                {
                    name: "poll",
                    description: "Creates a poll!",
                    options: [
                        {
                            name: "poll",
                            description: "The question that you want to ask!",
                            required: true,
                            type: "STRING",
                        },
                    ],
                },
                {
                    name: "kesem",
                    description: "!קונכיית הקסם",
                    options: [
                        {
                            name: "השאלה",
                            description: "השאלה שאתה רוצה לשאול",
                            required: true,
                            type: "STRING",
                        },
                    ],
                },
                {
                    name: "clear",
                    description:
                        "Deletes the amount of the message you want to delete.",
                    options: [
                        {
                            name: "amount",
                            description:
                                "The amount of the message you want to delete.",
                            required: true,
                            type: "NUMBER",
                        },
                    ],
                },
                {
                    name: "play",
                    description:
                        "Plays a song from Youtube / Spotify / SoundCloud / Arbitrary",
                    options: [
                        {
                            name: "query",
                            type: "STRING",
                            description: "The song you want to play",
                            required: true,
                        },
                    ],
                },
                {
                    name: "volume",
                    description: "Sets music volume",
                    options: [
                        {
                            name: "amount",
                            type: "NUMBER",
                            description: "The volume amount to set (0-100)",
                            required: false,
                        },
                    ],
                },
                {
                    name: "remove",
                    description: "Remove a specific track out of the queue",
                    options: [
                        {
                            name: "tracknumber",
                            type: "NUMBER",
                            description:
                                "The number of the track in the queue, you can check that out with /queue",
                            required: true,
                        },
                    ],
                },
                {
                    name: "loop",
                    description: "Sets loop mode",
                    options: [
                        {
                            name: "mode",
                            type: "INTEGER",
                            description: "Loop type",
                            required: true,
                            choices: [
                                {
                                    name: "Off",
                                    value: QueueRepeatMode.OFF,
                                },
                                {
                                    name: "Track",
                                    value: QueueRepeatMode.TRACK,
                                },
                                {
                                    name: "Queue",
                                    value: QueueRepeatMode.QUEUE,
                                },
                                {
                                    name: "Autoplay",
                                    value: QueueRepeatMode.AUTOPLAY,
                                },
                            ],
                        },
                    ],
                },
                {
                    name: "filter",
                    description: "Sets a filter",
                    options: [
                        {
                            name: "filter",
                            type: "STRING",
                            description:
                                "What filter do you want to put / remove",
                            required: true,
                            choices: [
                                {
                                    name: "bassboost",
                                    value: "bassboost",
                                },
                                {
                                    name: "8d",
                                    value: "8D",
                                },
                                {
                                    name: "vaporwave",
                                    value: "vaporwave",
                                },
                                {
                                    name: "nightcore",
                                    value: "nightcore",
                                },
                                {
                                    name: "phaser",
                                    value: "phaser",
                                },
                                {
                                    name: "vibrato",
                                    value: "vibrato",
                                },
                                {
                                    name: "tremolo",
                                    value: "tremolo",
                                },
                                {
                                    name: "reverse",
                                    value: "reverse",
                                },
                                {
                                    name: "normalizer",
                                    value: "normalizer",
                                },
                                {
                                    name: "pulsator",
                                    value: "pulsator",
                                },
                                {
                                    name: "subboost",
                                    value: "subboost",
                                },
                                {
                                    name: "subboost",
                                    value: "subboost",
                                },
                                {
                                    name: "haas",
                                    value: "haas",
                                },
                                {
                                    name: "mono",
                                    value: "mono",
                                },
                                {
                                    name: "mstlr",
                                    value: "mstlr",
                                },
                                {
                                    name: "mstrr",
                                    value: "mstrr",
                                },
                                {
                                    name: "compressor",
                                    value: "compressor",
                                },
                                {
                                    name: "expander",
                                    value: "expander",
                                },
                                {
                                    name: "softlimiter",
                                    value: "softlimiter",
                                },
                                {
                                    name: "chorus",
                                    value: "chorus",
                                },
                                {
                                    name: "chorus2d",
                                    value: "chorus2d",
                                },
                                {
                                    name: "chorus3d",
                                    value: "chorus3d",
                                },
                                {
                                    name: "fadein",
                                    value: "fadein",
                                },
                                {
                                    name: "superequalizer",
                                    value: "superequalizer",
                                },
                            ],
                        },
                    ],
                },
                {
                    name: "skip",
                    description: "Skip to the current song",
                },
                {
                    name: "queue",
                    description: "See the queue",
                },
                {
                    name: "pause",
                    description: "Pause the current song",
                },
                {
                    name: "resume",
                    description: "Resume the current song",
                },
                {
                    name: "stop",
                    description: "Stop the player",
                },
                {
                    name: "np",
                    description: "Now Playing",
                },
                {
                    name: "lyrics",
                    description: "Showing the lyrics of the song",
                },
                {
                    name: "back",
                    description: "Replaying the last song",
                },
                {
                    name: "ping",
                    description: "Pinging the bot!",
                },
                {
                    name: "help",
                    description:
                        "You didn't understand a thing of what's going on here? just type this command",
                },
                {
                    name: "shuffle",
                    description: "The bot shuffles the tracks in the queue."
                }
            ];
            let app = client.application as ClientApplication;
            let guild = message.guild as Guild;
            app.commands.set(data, guild.id);
            return message.reply("Deployed!");
        }
    },
};
