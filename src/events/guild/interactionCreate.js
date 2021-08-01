module.exports = async (Discord, client, interaction) => {

    if (!interaction.isCommand()) return

	if (!client.slashcommands.has(interaction.commandName)) return

    const guild = client.guilds.cache.find(
        (g) => g.id === interaction.member.guild.id
    );
    const member = guild.members.cache.find(
        (m) => m.id === interaction.member.user.id
    );
    const channel = guild.channels.cache.find(
        c => c.id === interaction.channelId
    )


	try {
        await interaction.defer()
		await client.slashcommands.get(interaction.commandName).execute(client, interaction, member, channel, guild);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

}