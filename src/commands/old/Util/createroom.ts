import {
    Guild,
    GuildMember,
    Message,
    VoiceChannel,
} from "discord.js";
import Client from "../../../Client";
import { Command } from "../../../Interfaces";

export const command: Command = {
    name: "createroom",
    aliases: ["cr"],
    cooldown: 5,
    description: "הבוט פותח חדר חדש ננדש רק לכם ולמי שתרצו שתכניסו",
    usage: "createroom || cr <כמה אנשים בחדר>",
    async execute(client: Client, message: Message, args: string[]) {
        if (!args[1])
            return message.channel.send(
                "אתה צריך לכתוב את המקסימום אנשים לחדר."
            );
        let guild = message.guild as Guild;
        let member = message.member as GuildMember;
        const newVoiceChannel = (await guild.channels.create(
            `חדר פרטי - ${message.author.username} -  ${args[1]}`,
            {
                type: "GUILD_VOICE",
                parent: "719179244781043813",
                userLimit: parseInt(args[1]),
            }
        )) as VoiceChannel;
        const voiceChannel = guild.channels.cache.find(
            (c) => c.id === newVoiceChannel.id
        ) as VoiceChannel;
        if (member.voice.channel) {
            member.voice.setChannel(voiceChannel);
        }

        const inviteVoice = await voiceChannel.createInvite({
            maxAge: 15,
            maxUses: parseInt(args[1]),
            reason: `Private room for ${message.member}`,
        });

        await message.channel.send(inviteVoice.url);

        message.delete();
        // setInterval(() => {
        //     if (
        //         guild.channels.cache.find((c) => c.id === voiceChannel.id)
        //     ) {
        //         if (voiceChannel.members.size === 0) {
        //             voiceChannel.delete().catch();
        //             inviteURL.delete().catch();
        //             return;
        //         // } else if (voiceChannel.full) {
        //         //     voiceChannel.permissionsFor(
        //         //         [
        //         //             {
        //         //                 id: '720677306036781218',
        //         //                 deny: ['VIEW_CHANNEL'],
        //         //             },
        //         //             {
        //         //                 id: message.author.id,
        //         //                 allow: ['VIEW_CHANNEL', 'MOVE_MEMBERS'],
        //         //             },
        //         //         ],
        //         //         'The channel is full'
        //         //     );
        //         // } else {
        //         //     voiceChannel.overwritePermissions(
        //         //         [
        //         //             {
        //         //                 id: '474584102335676427',
        //         //                 allow: ['VIEW_CHANNEL'],
        //         //             },
        //         //         ],
        //         //         'The channel is NOT full'
        //         //     );
        //         // }
        //     } else return;
        // }, 5000);
    },
};
