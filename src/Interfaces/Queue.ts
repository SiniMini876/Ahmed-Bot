import { Guild, Interaction } from "discord.js";

export interface Command {
    guild: Guild;
    metadata: Interaction;
}
