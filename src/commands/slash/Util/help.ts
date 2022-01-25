/* eslint-disable no-unused-vars */
import { CommandInteraction, Guild, GuildMember, MessageEmbed, TextChannel } from "discord.js";
import Client from "../../../Client";
import { SlashCommand } from "../../../Interfaces";

export const command: SlashCommand = {
    name: "help",
    description:
        "You didn't understand a thing of what's going on here? just type this command",
    async execute(client: Client, interaction: CommandInteraction, member: GuildMember, channel: TextChannel, guild: Guild) {
        const embed = new MessageEmbed()
            .setTitle("אחמד - Support")
            .setThumbnail(client.user!.displayAvatarURL())
            .setDescription(
                "So Discord published recently a new way to configure commands with Discord bots, To check out all of the commands you can just type `/` and you will see a bunch of commands and explanations on what they do. I hope you understand it because it way easier to control the bot."
            )
            .addField(
                "למה זה באנגלית?",
                "דיסקורד לא תומך בצורה מלאה בעברית לכן סיני היקר שלנו כתב הכל באנגלית"
            );

        interaction.editReply({ embeds: [embed] });
    },
};
