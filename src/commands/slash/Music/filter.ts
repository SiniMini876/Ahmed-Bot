import { CommandInteraction, GuildMember, TextChannel, Guild } from "discord.js";
import Client from "../../../Client";
import { SlashCommand } from "../../../Interfaces";

export const command: SlashCommand = {
    name: 'filter',
    description: 'Sets a filter',
    options: [
        {
            name: 'filter',
            type: 'STRING',
            description:
                'What filter do you want to put / remove',
            required: true,
            choices: [
                {
                    name: 'bassboost',
                    value: 'bassboost',
                },
                {
                    name: '8d',
                    value: '8D',
                },
                {
                    name: 'vaporwave',
                    value: 'vaporwave',
                },
                {
                    name: 'nightcore',
                    value: 'nightcore',
                },
                {
                    name: 'phaser',
                    value: 'phaser',
                },
                {
                    name: 'vibrato',
                    value: 'vibrato',
                },
                {
                    name: 'tremolo',
                    value: 'tremolo',
                },
                {
                    name: 'reverse',
                    value: 'reverse',
                },
                {
                    name: 'normalizer',
                    value: 'normalizer',
                },
                {
                    name: 'pulsator',
                    value: 'pulsator',
                },
                {
                    name: 'subboost',
                    value: 'subboost',
                },
                {
                    name: 'subboost',
                    value: 'subboost',
                },
                {
                    name: 'haas',
                    value: 'haas',
                },
                {
                    name: 'mono',
                    value: 'mono',
                },
                {
                    name: 'mstlr',
                    value: 'mstlr',
                },
                {
                    name: 'mstrr',
                    value: 'mstrr',
                },
                {
                    name: 'compressor',
                    value: 'compressor',
                },
                {
                    name: 'expander',
                    value: 'expander',
                },
                {
                    name: 'softlimiter',
                    value: 'softlimiter',
                },
                {
                    name: 'chorus',
                    value: 'chorus',
                },
                {
                    name: 'chorus2d',
                    value: 'chorus2d',
                },
                {
                    name: 'chorus3d',
                    value: 'chorus3d',
                },
                {
                    name: 'fadein',
                    value: 'fadein',
                },
                {
                    name: 'superequalizer',
                    value: 'superequalizer',
                },
            ],
        },
    ],
    async execute(client: Client, interaction: CommandInteraction, member: GuildMember, channel: TextChannel, guild: Guild) {
        const queue = client.player.getQueue(interaction.guildId!);
        if (!queue || !queue.playing)
            return void interaction.followUp({ content: "❌ | No music is being played!" });
        const filter = interaction.options.getString("filter")
        if(filter === "bassboost"){
            await queue.setFilters({
                bassboost: queue.getFiltersEnabled().includes("bassboost"),
                normalizer2: queue.getFiltersEnabled().includes("bassboost") // because we need to toggle it with bass
            });
        }
        await queue.setFilters({
            [filter!]: !queue.getFiltersEnabled().includes(filter as any),
        });

        interaction.editReply(`✅ | The filter ${filter} has been ${queue.getFiltersEnabled().includes(filter as any) ? "Enabled" : "Disabled"}!`)
    }
};
