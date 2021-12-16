module.exports = {
  name: "back",
  description: "Plays previous song!",
  execute(client, interaction, member, channel, guild) {
    const queue = client.player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
        return void interaction.editReply({ content: "❌ | No music is being played!" });

    queue.back()

  }
};
