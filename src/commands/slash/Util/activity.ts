import axios from 'axios';
import { SlashCommand } from '../../../Interfaces';
import Client from '../../../Client';
import {
    CommandInteraction,
    GuildMember,
    TextChannel,
    Guild,
    ApplicationCommandOptionChoice,
    ApplicationCommandOptionData,
    VoiceChannel,
} from 'discord.js';

//value: '755600276941176913',
//name: 'YouTube Together',

export const command: SlashCommand = {
    name: 'activity',
    description: "Let's you create an Activity in a VC!",
    options: [
        {
            name: 'activity',
            description: 'Which activity do you want to play.',
            required: true,
            type: 'STRING',
            choices: [
                {
                    value: '755827207812677713',
                    name: 'Poker Night',
                },
                {
                    value: '773336526917861400',
                    name: 'Betrayal.io',
                },
                {
                    value: '755600276941176913',
                    name: 'YouTube Together',
                },
                {
                    value: '814288819477020702',
                    name: 'Fishington.io',
                },
                {
                    value: '832012774040141894',
                    name: 'Chess in the Park',
                },
                {
                    value: '832012854282158180',
                    name: 'Putts Dis',
                },
                {
                    value: '878067389634314250',
                    name: 'DoodleCrew',
                },
                {
                    value: '879863686565621790',
                    name: 'LetterTile',
                },
                {
                    value: '879863976006127627',
                    name: 'WordSnacks',
                },
                {
                    value: '880218394199220334',
                    name: 'Watch Together',
                },
                {
                    value: '852509694341283871',
                    name: 'Spellcast',
                },
                {
                    value: '879863881349087252',
                    name: 'Awkword',
                },
                {
                    value: '832013003968348200',
                    name: 'Checkers In The Park (New)',
                },
                {
                    value: '879864070101172255',
                    name: 'SketchyArtist (New)',
                },
            ] as ApplicationCommandOptionChoice[],
        } as ApplicationCommandOptionData,
        {
            name: 'voicechannel',
            description:
                'The VC that the bot will activate OR a Channel that you already in.',
            required: false,
            type: 'CHANNEL',
        },
    ],
    async execute(
        client: Client,
        interaction: CommandInteraction,
        member: GuildMember,
        channel: TextChannel,
        guild: Guild
    ) {
        let returnData = {
            code: 'none',
        };
        let VCchannel;

        if (interaction.options.getChannel('voicechannel')) {
            VCchannel = interaction.options.getChannel(
                'voicechannel'
            ) as VoiceChannel;
        } else {
            VCchannel = member.voice.channel as VoiceChannel;
        }

        axios({
            url: `https://discord.com/api/v8/channels/${VCchannel!.id}/invites`,
            method: 'POST',
            headers: {
                Authorization: `Bot ${process.env.BOT_TOKEN}`,
                'Content-Type': 'application/json',
            },
            data: {
                max_age: 86400,
                max_uses: 0,
                target_application_id:
                    interaction.options.getString('activity'),
                target_type: 2,
                temporary: false,
                validate: null,
            },
        })
            .then(async (res) => {
                let invite = res.data;
                if (invite.code === 50013 || invite.code === '50013')
                    console.warn(
                        'Your bot lacks permissions to perform that action'
                    );
                returnData.code =
                    `https://discord.com/invite/${invite.code}` +
                    ' **To start the activity, press this link!**';
            })
            .then(async () => {
                interaction.editReply(returnData.code);
            });
    },
};
