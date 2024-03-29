/* eslint-disable no-console */
const cooldowns = new Map();
import Discord, {
    CommandInteraction,
    GuildMember,
} from "discord.js";
import Client from "../../Client";
import { Event } from "../../Interfaces";

export const event: Event = {
    name: "interactionCreate",
    execute: async (client: Client, interaction: CommandInteraction) => {
        if (interaction.isButton())
            return await (await import("../configuration/buttonsConfiguration")).event.execute(
                client,
                interaction
            );
        if (!interaction.isCommand()) return;
        await interaction.deferReply();

        if (!client.slashcommands.has(interaction.commandName)) return;
        const command = client.slashcommands.get(interaction.commandName);
        if (!interaction.member) return;

        const guild = client.guilds.cache.find(
            (g) =>
                (g.id as string) ===
                ((interaction.member as GuildMember).guild.id as string)
        );

        if (!guild) return;
        const member = interaction.member as GuildMember;

        const channel = guild.channels.cache.find(
            (c) => c.id === interaction.channelId
        ) as any;

        if (!cooldowns.has(command!.name)) {
            cooldowns.set(command!.name, new Discord.Collection());
        }

        const current_time = Date.now();
        const time_stamps = cooldowns.get(command!.name);
        const cooldown_amount = command!.cooldown! * 1000 || 5000;

        if (time_stamps.has(member.id)) {
            const expiration_time =
                time_stamps.get(member.id) + cooldown_amount;

            if (current_time < expiration_time) {
                const time_left = (expiration_time - current_time) / 1000;

                return interaction.editReply({
                    content: `Please wait ${time_left.toFixed(
                        1
                    )} more second(s) before reusing the \`${
                        command!.name
                    }\` command.`,
                });
            }
        }
        if (!client.application?.owner) await client.application?.fetch();
        if (member.id !== client.application?.owner?.id) {
            time_stamps.set(member.id, current_time);
            setTimeout(() => time_stamps.delete(member.id), cooldown_amount);
        }
        try {
            await client.slashcommands
                .get(interaction.commandName)!
                .execute(client, interaction, member, channel, guild);
        } catch (error) {
            console.error(error);
            await interaction.editReply({
                content: "There was an error while executing this command!",
            });
        }
    },
};
