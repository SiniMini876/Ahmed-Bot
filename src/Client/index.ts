import {
    ApplicationCommandData,
    ApplicationCommandDataResolvable,
    Client,
    Collection,
    User,
} from 'discord.js';
import { readdirSync } from 'fs';
import { Command, SlashCommand, Event } from '../Interfaces';
import dotenv from 'dotenv';
import { Player } from 'discord-player';
import { table } from 'table';
dotenv.config();

class ExtendedClient extends Client {
    public oldcommands: Collection<string, Command> = new Collection();
    public aliases: Collection<string, Command> = new Collection();
    public player: Player = new Player(this, {
        ytdlOptions: {
            filter: 'audioonly',
        },
    });
    public slashcommands: Collection<string, SlashCommand> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public prefix = process.env.PREFIX;

    public async init() {
        this.login(process.env.BOT_TOKEN);

        // Event Handler

        let events = [['Event Name', 'Directory', 'Check']];
        let eventdirs = readdirSync('src/events');

        const index = eventdirs.indexOf('configuration');
        if (index > -1) {
            eventdirs.splice(index, 1);
        }

        for (const dir of eventdirs) {
            const event_files = readdirSync(`src/events/${dir}`).filter(
                (file) => file.endsWith('.ts' || '.js')
            );

            for (const file of event_files) {
                const { event } = await import(`../events/${dir}/${file}`);
                this.on(event.name, event.execute.bind(null, this));
                events.push([event.name, dir, '✅']);
            }
        }

        console.log(table(events));
    }
}

export default ExtendedClient;
