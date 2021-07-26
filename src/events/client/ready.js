const express = require('express');
const app = express();
const port = 3000;
const wokCommands = require('wokcommands');
let demoServerID = '720226309267259432';
let buganimServerID = '693864294911049829';
const fetch = require('node-fetch');
require('dotenv').config()

module.exports = async (Discord, client) => {
    const getApp = (guildID) => {
        const app = client.api.applications(client.user.id);
        if (guildID) {
            app.guilds(guildID);
        }
        return app;
    };

    app.get('/', (req, res) => res.send('AhmedBot is Active!'));

    app.listen(port, () =>
        console.log(`AhmedBot is Active and lisening on port ${port}`)
    );

    getApp(buganimServerID, demoServerID, '839124298983014450').commands.post({
        data: {
            name: 'activity',
            description: "Let's you create an Activity in a VC!",
            options: [
                {
                    name: 'channel',
                    description: 'The VC that the bot will activate',
                    required: true,
                    type: 7,
                },
                {
                    name: 'activity',
                    description: 'Which activity do you want to play.',
                    required: true,
                    type: 3,
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
    }); 

    const reply = (interaction, response) => {
        client.api
            .interactions(interaction.id, interaction.token)
            .callback.post({
                data: {
                    type: 4,
                    data: {
                        content: response,
                    },
                },
            });
    };

    client.ws.on('INTERACTION_CREATE', async (interaction) => {
        let returnData = {
            code: 'none'
        };

        const { options } = interaction.data;

        const command = interaction.data.name;

        const guild = client.guilds.cache.find(
            (g) => g.id === interaction.guild_id
        );
        const member = guild.members.cache.find(
            (m) => m.id === interaction.member.user.id
        );
        const VCchannel = guild.channels.cache.find(
            (c) => c.id === options[0].value
        );

        if (command === 'activity') {
            if (!member.voice.channel)
                return reply(
                    interaction,
                    'You must be in the same VC as you selected! || You must select VC!'
                );
            if (member.voice.channelID !== VCchannel.id) {
                return reply(
                    interaction,
                    'You must be in the same VC as you selected!'
                );
            }

            await fetch(`https://discord.com/api/v8/channels/${VCchannel.id}/invites`, {
                method: 'POST',
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id: options[1].value,
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    'Authorization': `Bot ${process.env.BOT_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(invite => {
                    if (invite.error || !invite.code) throw new Error('An error occured while retrieving data !');
                    if(invite.code === 50013 || invite.code === '50013') console.warn('Your bot lacks permissions to perform that action')
                    returnData.code = `https://discord.com/invite/${invite.code}` + " **To start the activity, press this link!**"
                })

            reply(interaction, returnData.code);
        }
    });

    client.user
        .setActivity('להרביץ ליהודים', { type: 'PLAYING' })
        .catch(console.error);

    new wokCommands(client, {
        commandsDir: 'slashCommands',
        testServers: [demoServerID, buganimServerID],
        showWarns: false,
    });

    setInterval(() => {
        let guild = client.guilds.cache.get('693864294911049829');
        let memberCounterChannel =
            guild.channels.cache.get('791247896762515457');
        memberCounterChannel.setName(
            `יש אצלנו ${guild.memberCount.toLocaleString()} נחשים`
        );
    }, 1.8e6);
    setInterval(() => {
        let guild = client.guilds.cache.find(
            (g) => g.id === '693864294911049829'
        );
        let textChannel = guild.channels.cache.find(
            (c) => c.id === '719178323200180266'
        );
        const dog24 = require('../../commands/Settings/dog').run(
            client,
            textChannel
        );
    }, 8.64e7);
};
