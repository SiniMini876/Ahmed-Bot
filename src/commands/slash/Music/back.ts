import { CommandInteraction, Guild, GuildMember, TextChannel } from "discord.js";
import Client from "../../../Client";
import { SlashCommand } from "../../../Interfaces";

export const command: SlashCommand = {
  name: "back",
  description: "Replaying the last song",
  execute(client: Client, interaction: CommandInteraction, _member: GuildMember, _channel: TextChannel, _guild: Guild) {
    const queue = client.player.getQueue(interaction.guildId!);
    if (!queue || !queue.playing)
        return void interaction.editReply({ content: "❌ | No music is being played!" });

    queue.back();

  }
};
