/* eslint-disable no-console */
import { SlashCommand } from "../../../Interfaces";
import Client from "../../../Client";
import {
    CommandInteraction,
    GuildMember,
    ApplicationCommandOptionChoice,
    ApplicationCommandOptionData,
    VoiceChannel,
} from "discord.js";
import fetch from "node-fetch";

//value: '755600276941176913',
//name: 'YouTube Together',

export const command: SlashCommand = {
    name: "activity",
    description: "Let's you create an Activity in a VC!",
    options: [
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
                {
                    value: "814288819477020702",
                    name: "Fishington.io",
                },
                {
                    value: "832012774040141894",
                    name: "Chess in the Park",
                },
                {
                    value: "832012854282158180",
                    name: "Putts Dis",
                },
                {
                    value: "878067389634314250",
                    name: "DoodleCrew",
                },
                {
                    value: "879863686565621790",
                    name: "LetterTile",
                },
                {
                    value: "879863976006127627",
                    name: "WordSnacks",
                },
                {
                    value: "880218394199220334",
                    name: "Watch Together",
                },
                //                 {
                //                     value: '852509694341283871',
                //                     name: 'Spellcast',
                //                 },
                //                 {
                //                     value: '879863881349087252',
                //                     name: 'Awkword',
                //                 },
                //                 {
                //                     value: '832013003968348200',
                //                     name: 'Checkers In The Park (New)',
                //                 },
                //                 {
                //                     value: '879864070101172255',
                //                     name: 'SketchyArtist (New)',
                //                 },
            ] as ApplicationCommandOptionChoice[],
        } as ApplicationCommandOptionData,
        {
            name: "voicechannel",
            description:
                "The VC that the bot will activate OR a Channel that you already in.",
            required: false,
            type: "CHANNEL",
        },
    ],
    async execute(
        client: Client,
        interaction: CommandInteraction,
        member: GuildMember
    ) {
        let returnData = {
            code: "none",
        };
        let VCchannel;

        if (interaction.options.getChannel("voicechannel")) {
            VCchannel = interaction.options.getChannel(
                "voicechannel"
            ) as VoiceChannel;
        } else {
            VCchannel = member.voice.channel as VoiceChannel;
        }

        await fetch(
            `https://discord.com/api/v8/channels/${VCchannel.id}/invites`,
            {
                method: "POST",
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id:
                        interaction.options.getString("activity"),
                    target_type: 2,
                    temporary: false,
                    validate: null,
                }),
                headers: {
                    Authorization: `Bot ${process.env.BOT_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .then((invite: any) => {
                if (invite.error || !invite.code)
                    throw new Error("An error occured while retrieving data !");
                if (invite.code === 50013 || invite.code === "50013")
                    console.warn(
                        "Your bot lacks permissions to perform that action"
                    );
                returnData.code =
                    `https://discord.com/invite/${invite.code}` +
                    " **To start the activity, press this link!**";
            });

        interaction.editReply({
            content: returnData.code,
        });
    },
};
