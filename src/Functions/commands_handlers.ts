import { ApplicationCommandData, ApplicationCommandDataResolvable, Collection, User } from 'discord.js';
import { readdirSync } from 'fs';
import { table } from 'table';
import Client from '../Client';

export const handler = {
    async execute(client: Client){
                // Commands Handler
                let olddirs = readdirSync('src/commands/old');
                let oldcmds = [['Command Name', 'Directory', 'Check']];
        
                for (const dir of olddirs) {
                    const commands_files = readdirSync(
                        `src/commands/old/${dir}`
                    ).filter((file) => file.endsWith('.ts'));
                    for (const file of commands_files) {
                        const { command } = await import(
                            `../commands/old/${dir}/${file}`
                        );
                        client.oldcommands.set(command.name, command);
                        oldcmds.push([command.name, dir, '✅']);
                    }
                }
                console.log(table(oldcmds));
        
                // Slash Commands Handler
        
                let slashcmds = [['Slash Command Name', 'Directory', 'Check']];
                let slashdirs = readdirSync('src/commands/slash');
                let guilds = ["693864294911049829" /*buganim*/ , "839124298983014450" /*skyblock*/, "720226309267259432" /*demo*/]
        
                for (const dir of slashdirs) {
                    const commands_files = readdirSync(
                        `src/commands/slash/${dir}`
                    ).filter((file) => file.endsWith('.ts'));
                    for (const file of commands_files) {
                        const { command } = await import(
                            `../commands/slash/${dir}/${file}`
                        );

                        let data: ApplicationCommandData = {
                            name: command.name,
                            description: command.description,
                            options: undefined,
                        }
                        if(command.options){
                            data.options = command.options
                        }
                        if(command.guilds){
                            guilds = command.guilds
                        }
                        client.application!.fetch();
                
                        guilds.forEach(guild => {
                            client.application?.commands.create(data, guild)
                        })

                        client.slashcommands.set(command.name, command);
                        slashcmds.push([command.name, dir, '✅']);
                    }
                }
        
                console.log(table(slashcmds));
    }
}