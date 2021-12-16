const fs = require("fs");

module.exports = (Discord, client) => {
    const music_command_files = fs.readdirSync("src/commands/slash/Music").filter((file) => file.endsWith(".js"));
    const util_command_files = fs.readdirSync("src/commands/slash/Util").filter((file) => file.endsWith(".js"));

    for (const file of music_command_files) {
        const command = require(`../commands/slash/Music/${file}`);
        client.slashcommands.set(command.name, command);
        console.log(`*${command.name}* From SLASH Music Dir Loaded ✅`)
        continue;
    }
    for (const file of util_command_files) {
        const command = require(`../commands/slash/Util/${file}`);
        client.slashcommands.set(command.name, command);
        console.log(`*${command.name}* From SLASH Util Dir Loaded ✅`)
        continue;
    }
};
