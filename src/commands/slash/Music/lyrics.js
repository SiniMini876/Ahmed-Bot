const { MessageEmbed } = require("discord.js");
const lyricsParse = require("lyrics-finder");

module.exports = {
    name: "lyrics",
    aliases: ["ly"],
    description: "Get lyrics for the currently playing song",
    usage: "!ly",
    async execute(client, interaction, member, channel, guild) {
        const queue = client.player.getQueue(interaction.guildId);
        if (!queue || !queue.playing)
            return void interaction.editReply({ content: "❌ | No music is being played!" });

		const songName = queue.nowPlaying().title;
        const artistName = queue.nowPlaying().author;
		if(!songName){
			return interaction.editReply("I couldn't find the song name!");
		}
        
		const embed = new MessageEmbed()
			.setAuthor("Lyrics of", songName)
			.setFooter(client.user.username)

		try {

			let lyrics = await lyricsParse(artistName, songName) || "Not Found!";

			interaction.editReply(`__**Lyrics for ${songName} made by ${artistName}**__\n\`\`\`${lyrics}\`\`\``);

		} catch(e){
			console.log(e);
			interaction.editReply("No lyrics found for", {
				songName
			});
		}

    }
};
