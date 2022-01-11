import { CommandInteraction, GuildMember, TextChannel, Guild, VoiceChannel } from 'discord.js';
import dotenv from 'dotenv';
import Client from '../../../Client';
import { SlashCommand } from '../../../Interfaces';
dotenv.config();

export const command: SlashCommand = {
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
    async execute(client: Client, interaction: CommandInteraction, member: GuildMember, channel: TextChannel, guild: Guild) {
        const max = interaction.options.getNumber('maximumpeople');

        if (guild.id !== '693864294911049829')
            // buganim's ID
            return interaction.editReply(
                "This command can only be used in Buganim's Server!"
            );

        const newVoiceChannel = await guild.channels.create(
            `חדר פרטי - ${interaction.user.username} -  ${max}`,
            {
                type: 'GUILD_VOICE',
                // parent: '762279647815401483',
                parent: '719179244781043813',
                userLimit: max as number,
            }
        );
        const voiceChannel = guild.channels.cache.find(
            (c) => c.id === newVoiceChannel.id
        ) as VoiceChannel
        if (member.voice.channel) {
            member.voice.setChannel(voiceChannel as VoiceChannel);
        }

        const inviteVoice = await (voiceChannel as VoiceChannel).createInvite({
            maxUses: max as number,
            reason: `Private room for ${member}`,
        });

        const inviteURL = await interaction.editReply(inviteVoice.url);

        setInterval(() => {
            if (guild.channels.cache.find((c) => c.id === voiceChannel!.id)) {
                if (
                    voiceChannel.members.filter((member) => !member.user.bot)
                        .size == 0
                ) {
                    voiceChannel.delete().catch();
                    interaction.deleteReply().catch();
                    return;
                } else if (voiceChannel.full) {
                    voiceChannel.edit(
                        {
                            permissionOverwrites: [
                                {
                                    id: '720677306036781218',
                                    deny: ['VIEW_CHANNEL'],
                                },
                                {
                                    id: member.id,
                                    allow: ['VIEW_CHANNEL', 'MOVE_MEMBERS'],
                                },
                            ],
                        },
                        'The channel is full'
                    );
                } else {
                    voiceChannel.edit({
                        permissionOverwrites: [
                            {
                                id: '474584102335676427',
                                allow: ['VIEW_CHANNEL'],
                            },
                        ],
                    });
                }
            } else return;
        }, 5000);
    },
};
