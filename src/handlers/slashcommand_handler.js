const fs = require('fs');

module.exports = (Discord, client) => {
    const command_files = fs
        .readdirSync('src/slashCommands/')
        .filter((file) => file.endsWith('.js'));

    for (const file of command_files) {
        const command = require(`../slashCommands/${file}`);
        client.slashcommands.set(command.name, command);
        continue;
    }
};
