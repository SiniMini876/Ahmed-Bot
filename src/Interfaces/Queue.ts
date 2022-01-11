import Client from '../Client';
import { Collection, Guild, Interaction } from 'discord.js';

export interface Command {
    guild: Guild,
    metadata: Interaction
}
