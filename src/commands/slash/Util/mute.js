const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = {
    name: 'mute',
    description: 'Mutes',
    async execute(client, interaction, member, channel, guild) {
        const user = interaction.options.getUser('member');
        const duration = interaction.options.getNumber('duration');
        const time = interaction.options.getString('time');

        if (!member.permissions.has('MANAGE_ROLES'))
            return interaction.editReply(
                "You don't have the permission to do this."
            );

        const mutedMember = guild.members.cache.find(
            (member) => member.id === user.id
        );

        if (mutedMember.voice) {
            mutedMember.voice.setMute(
                true,
                `${member.username} muted ${user.username} for ${duration} ${time}`
            );
            interaction.editReply(
                `I muted <@${user.id}> for ${duration} ${time}`
            );
        } else {
            return interaction.editReply('The user is not in a voice channel.');
        }

        let durationInMilliseconds;
        if (time == 's') durationInMilliseconds = duration * 1000;
        if (time == 'm') durationInMilliseconds = duration * 60000;
        if (time == 'h') durationInMilliseconds = duration * 3.6e6;
        if (time == 'd') durationInMilliseconds = duration * 8.64e7;

        setTimeout(() => {
            mutedMember.voice.setMute(
                false,
                `${member.username} unmuted ${user.username} for ${duration} ${time}`
            );
            return interaction.editReply(`I unmuted <@${user.id}>`);
        }, durationInMilliseconds);
    },
};
