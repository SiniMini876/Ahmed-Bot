/* eslint-disable no-console */
import { ApplicationCommandData } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import { table } from "table";
import Client from "../Client";

export const handler = {
    async execute(client: Client) {
        // Commands Handler
        let olddirs = readdirSync("src/commands/old");
        let oldPath = path.join(__dirname, "../", "commands/old");
        let oldcmds = [["Command Name", "Directory", "Check"]];

        for (const dir of olddirs) {
            const commands_files = readdirSync(`${oldPath}/${dir}`).filter(
                (file) => file.endsWith(".js") || file.endsWith(".ts")
            );
            for (const file of commands_files) {
                const { command } = await import(
                    `../commands/old/${dir}/${file}`
                );
                client.oldcommands.set(command.name, command);
                oldcmds.push([command.name, dir, "✅"]);
            }
        }
        console.log(table(oldcmds));

        // Slash Commands Handler

        let slashcmds = [["Slash Command Name", "Directory", "Check"]];
        let slashPath = path.join(__dirname, "../", "commands/slash");
        let slashdirs = readdirSync(slashPath);
        let guilds = ["720226309267259432" /*demo*/];

        let data: ApplicationCommandData[] = [];

        for (const dir of slashdirs) {
            const commands_files = readdirSync(`${slashPath}/${dir}`).filter(
                (file) => file.endsWith(".js") || file.endsWith(".ts")
            );
            for (const file of commands_files) {
                const { command } = await import(
                    `../commands/slash/${dir}/${file}`
                );

                let cmd: ApplicationCommandData = {
                    name: command.name,
                    description: command.description,
                    options: undefined,
                };
                if (command.options) {
                    cmd.options = command.options;
                }

                client.application!.fetch();

                data.push(cmd);

                client.slashcommands.set(command.name, command);
                slashcmds.push([command.name, dir, "✅"]);
            }
        }

        guilds.forEach((guild) => {
            client.application?.commands.set(data, guild);
        });

        console.log(table(slashcmds));
    },
};
