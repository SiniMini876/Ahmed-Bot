const fs = require("fs");

module.exports = (Discord, client) => {
    const music_command_files = fs.readdirSync("src/commands/old/Music").filter((file) => file.endsWith(".js"));
    const util_command_files = fs.readdirSync("src/commands/old/Util").filter((file) => file.endsWith(".js"));

    for (const file of music_command_files) {
        const command = require(`../commands/old/Music/${file}`);
        client.oldcommands.set(command.name, command);
        console.log(`*${command.name}* From OLD Music Dir Loaded ✅`)
        continue;
    }
    for (const file of util_command_files) {
        const command = require(`../commands/old/Util/${file}`);
        client.oldcommands.set(command.name, command);
        console.log(`*${command.name}* From OLD Util Dir Loaded ✅`)
        continue;
    }
};