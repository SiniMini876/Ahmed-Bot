/* eslint-disable no-unused-vars */
import { CommandInteraction, GuildMember, TextChannel, Guild } from "discord.js";
import Client from "../../../Client";
import { SlashCommand } from "../../../Interfaces";

export const command: SlashCommand = {
    name: "shuffle",
    description: "The bot shuffles the tracks in the queue.",
    execute(client: Client, interaction: CommandInteraction, member: GuildMember, channel: TextChannel, guild: Guild) {
        const queue = client.player.getQueue(interaction.guildId!);

        const voice = (interaction.member as GuildMember).voice.channel;
        if (!voice) {
            return interaction.editReply("You need to be in a voice channel!");
        }

        if (!queue) {
            return interaction.editReply("There is nothing playing!");
        }

        queue.shuffle();
    },
};
