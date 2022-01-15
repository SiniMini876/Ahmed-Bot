import {
    CommandInteraction,
    GuildMember,
    TextChannel,
    Guild,
} from 'discord.js';
import dotenv from 'dotenv';
import Client from '../../../Client';
dotenv.config();
// import heroku from '../../../Functions/deploytoheroku';
import { SlashCommand } from '../../../Interfaces';

export const command: SlashCommand = {
    name: 'restart',
    description: 'The bot restarts, should take a couple of minutes',
    async execute(
        client: Client,
        interaction: CommandInteraction,
        member: GuildMember,
        channel: TextChannel,
        guild: Guild
    ) {
        interaction
            .editReply('The bot will be online soon, wait like 3 minutes ✅')
            .then((m) => {
                process.exit(0);
            });
    },
};
