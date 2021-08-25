const Discord = require('discord.js');
const { Client, Util, MessageEmbed, MessageAttachment } = require('discord.js');
const { description } = require('../../slashCommands/activity');
let demoServerID = '720226309267259432';
let buganimServerID = '693864294911049829';
let skyblockID = '839124298983014450';

module.exports = {
    name: 'deploy',
    async execute(client, message, args) {
        if (!client.application?.owner) await client.application?.fetch();

        if (message.author.id === client.application.owner.id) {
            const data = [
                {
                    name: 'activity',
                    description: "Let's you create an Activity in a VC!",
                    options: [
                        {
                            name: 'channel',
                            description: 'The VC that the bot will activate',
                            required: true,
                            type: 'CHANNEL',
                        },
                        {
                            name: 'activity',
                            description: 'Which activity do you want to play.',
                            required: true,
                            type: 'STRING',
                            choices: [
                                {
                                    name: 'Youtube Together',
                                    value: '755600276941176913',
                                },
                                {
                                    name: 'Poker Night',
                                    value: '755827207812677713',
                                },
                                {
                                    name: 'Betrayal',
                                    value: '773336526917861400',
                                },
                                {
                                    name: 'Fishing',
                                    value: '814288819477020702',
                                },
                                {
                                    name: 'Chess',
                                    value: '832012774040141894',
                                },
                                {
                                    name: 'ChessDEV',
                                    value: '832012586023256104',
                                },
                            ],
                        },
                    ],
                },
                {
                    name: 'createroom',
                    description:
                        "Let's you create a unique room just for you and the number of people you set!",
                    options: [
                        {
                            name: 'maximumpeople',
                            description:
                                'The maximum amount of people that can join!',
                            required: true,
                            type: 'NUMBER',
                        },
                    ],
                },
                {
                    name: 'poll',
                    description: 'Creates a poll!',
                    options: [
                        {
                            name: 'poll',
                            description: 'The question that you want to ask!',
                            required: true,
                            type: 'STRING',
                        },
                    ],
                },
                {
                    name: 'kesem',
                    description: '!קונכיית הקסם',
                    options: [
                        {
                            name: 'השאלה',
                            description: 'השאלה שאתה רוצה לשאול',
                            required: true,
                            type: 'STRING',
                        },
                    ],
                },
                {
                    name: 'mute',
                    description: 'Mutes the person you choose.',
                    options: [
                        {
                            name: 'member',
                            description: 'Your member that you want to mute.',
                            required: true,
                            type: 'USER',
                        },
                        {
                            name: 'duration',
                            description:
                                'The duration you want to set for the mute.',
                            required: true,
                            type: 'NUMBER',
                        },
                        {
                            name: 'time',
                            description:
                                'The type of time you want to set for the mute.',
                            choices: [
                                {
                                    name: 'seconds',
                                    value: 's',
                                },
                                {
                                    name: 'minutes',
                                    value: 'm',
                                },
                                {
                                    name: 'hours',
                                    value: 'h',
                                },
                                {
                                    name: 'days',
                                    value: 'd',
                                },
                            ],
                            required: true,
                            type: 'STRING',
                        },
                    ],
                },
            ];

            client.application.commands.set(data, message.guild.id);
            return message.reply("Deployed!")
        }
    },
};
