import Client from '../Client';
import { Message } from 'discord.js';

interface execute {
    (client: Client, message: Message, args: string[]): any;
}

export interface Command {
    name: string;
    description?: string;
    cooldown?: number,
    aliases?: any[],
    usage?: any,
    execute: execute;
}
