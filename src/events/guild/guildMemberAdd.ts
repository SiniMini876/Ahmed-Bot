import { Player } from 'discord-player';
import {
    GuildChannel,
    GuildMember,
    Role,
    TextChannel,
} from 'discord.js';
import Client from '../../Client';
import { Event } from '../../Interfaces';

export const event: Event = {
    name: 'guildMemberAdd',
    execute: (client: Client, guildMember: GuildMember) => {
        // ALMO
        if (guildMember.guild.id === '693864294911049829') {
            let welcomeChannel = guildMember.guild.channels.cache.get(
                '719178323200180266'
            ) as TextChannel;
            welcomeChannel.send(
                `מה המצב <@${guildMember.user.id}> ברוך הבא לשרת המגניב שלנו!`
            );
        }
        // Buganim
        if (guildMember.guild.id === '805361587103203378') {
            let welcomeChannel = guildMember.guild.channels.cache.get(
                '805365025538965544'
            ) as TextChannel;
            welcomeChannel.send(
                `שלום <@${guildMember.user.id}> אתה מהיום אלמו!`
            );
            let almo = guildMember.guild.roles.cache.find(
                (r) => r.id === '805364807427162132'
            ) as Role;
            guildMember.roles.add(almo);
        }
        // Skyblock
        if (guildMember.guild.id === '839124298983014450') {
            let welcomeChannel = guildMember.guild.channels.cache.get(
                '839129581725155379'
            ) as TextChannel;
            welcomeChannel.send(
                `Hello <@${guildMember.user.id}>, welcome to the skyblock best community! `
            );
            let resident = guildMember.guild.roles.cache.find(
                (r) => r.id === '839127143409516554'
            ) as Role;
            guildMember.roles.add(resident);
        }
    },
};
