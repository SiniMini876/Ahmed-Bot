/* eslint-disable no-unused-vars */
import Client from "../Client";
import { ClientEvents } from "discord.js";

interface execute {
    (client: Client, ...args: any[]): any;
}

export interface Event {
    name: keyof ClientEvents;
    execute: execute;
}