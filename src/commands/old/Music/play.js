module.exports = {
    name: "play",
    cooldown: 5,
    aliases: ["p"],
    description: "Plays audio from YouTube or Soundcloud",
    usage: "!p <name of the song or URL>",
    async execute(message, args, client) {
        let player = client.player
        const { channel } = message.member.voice;
        if (!channel) return message.reply("You need to join a voice channel first!").catch(console.error);
        if (!args.length)
            return message
                .reply(`Usage: ${message.client.prefix}play <YouTube URL | Video Name | Soundcloud URL>`)
                .catch(console.error);

        const permissions = channel.permissionsFor(message.client.user);
        if (!permissions.has("CONNECT"))
            return message.reply("Cannot connect to voice channel, missing permissions");
        if (!permissions.has("SPEAK"))
            return message.reply(
                "I cannot speak in this voice channel, make sure I have the proper permissions!"
            );

        const query = args.join(" ");

        const queue = player.createQueue(message.guild, {
            metadata: message
        });
        const song = await player.search(query, {
            requestedBy: message.author
        });

        try {
            await queue.connect(message.member.voice.channel);
        } catch {
            message.reply("Could not join your voice channel ❌");
        }

        queue.addTrack(song.tracks[0]);
        queue.play();
    }
};
