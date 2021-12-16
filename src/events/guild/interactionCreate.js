const cooldowns = new Map();
const Discord = require("discord.js");

module.exports = async (discord, client, interaction) => {
    if (interaction.isButton()) return require("./buttonsConfiguration")(discord, client, interaction);
    if (!interaction.isCommand()) return;
    await interaction.deferReply();

    if (!client.slashcommands.has(interaction.commandName)) return;
    const command = client.slashcommands.get(interaction.commandName);

    const guild = client.guilds.cache.find((g) => g.id === interaction.member.guild.id);
    const member = guild.members.cache.find((m) => m.id === interaction.member.user.id);
    const channel = guild.channels.cache.find((c) => c.id === interaction.channelId);

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = command.cooldown * 1000 || 5000;

    if (time_stamps.has(interaction.member.id)) {
        const expiration_time = time_stamps.get(interaction.member.id) + cooldown_amount;

        if (current_time < expiration_time) {
            const time_left = (expiration_time - current_time) / 1000;

            return interaction.editReply({
                content: `Please wait ${time_left.toFixed(1)} more second(s) before reusing the \`${
                    command.name
                }\` command.`,
                ephemeral: true
            });
        }
    }
    if (!client.application?.owner) await client.application?.fetch();
    if (interaction.member.id !== client.application?.owner?.id) {
        time_stamps.set(interaction.member.id, current_time);
        setTimeout(() => time_stamps.delete(interaction.member.id), cooldown_amount);
    }
    try {
        await client.slashcommands
            .get(interaction.commandName)
            .execute(client, interaction, member, channel, guild);
    } catch (error) {
        console.error(error);
        await interaction.editReply({
            content: "There was an error while executing this command!",
            ephemeral: true
        });
    }
};
