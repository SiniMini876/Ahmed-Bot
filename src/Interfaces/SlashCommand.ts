import Client from '../Client';
import {
    ApplicationCommandData,
    ApplicationCommandOptionData,
    ApplicationCommandType,
    BaseApplicationCommandData,
    ChatInputApplicationCommandData,
    CommandInteraction,
    Guild,
    GuildMember,
    TextChannel,
} from 'discord.js';
import { ApplicationCommandTypes } from 'discord.js/typings/enums';

interface execute {
    (
        client: Client,
        interaction: CommandInteraction,
        member: GuildMember,
        channel: TextChannel,
        guild: Guild
    ): any;
}
export interface SlashCommand extends ChatInputApplicationCommandData, BaseApplicationCommandData {
    name: string;
    description: string;
    guilds?: [];
    cooldown?: number;
    type?: 'CHAT_INPUT' | ApplicationCommandTypes.CHAT_INPUT;
    options?: ApplicationCommandOptionData[];
    defaultPermission?: boolean;
    execute: execute;
}
