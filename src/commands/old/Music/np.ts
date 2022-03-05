import { Message, MessageEmbed, User } from "discord.js";
import Client from "../../../Client";
import { Command } from "../../../Interfaces";

export const command: Command = {
    name: "np",
    description: "Show now playing song",
    usage: "!np",
    async execute(client: Client, message: Message) {
        const queue = client.player.getQueue(message.guildId!);
        if (!queue || !queue.playing)
            return void message.reply({
                content: "❌ | No music is being played!",
            });

        const progress = queue.createProgressBar();
        const currentTrack = queue.current;

        let track1;

        if (!queue.tracks[1]) track1 = "None";
        else track1 = queue.tracks[1]!.title;

        let embed = new MessageEmbed()
            .setTitle(`🎶 Now Playing | [**${currentTrack.title}**](${currentTrack.url})`)
            .setColor(0xffffff)
            .addField("*Volume: *", `\`${queue.volume.toString()}\``)
            .addField("\u200b", progress)
            .addField("Up next: ", track1)
            .setThumbnail(queue.current.thumbnail)
            .setAuthor({
                name: queue.current.author,
                url: queue.current.description,
                iconURL: queue.current.thumbnail,
            })
            .setFooter({
                text: "Made by SiniMini876",
                iconURL: ((client.application!.owner! as User).avatarURL) as any,
            });

        return void message.channel.send({
            embeds: [embed],
        });
    },
};
