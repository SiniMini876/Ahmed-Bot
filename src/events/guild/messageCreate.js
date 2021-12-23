require('dotenv').config();

const cooldowns = new Map();

module.exports = async (Discord, client, message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(client.prefix)) {
        require('../../commands/old/Settings/custom_words').run(
            client,
            message
        );
        return;
    }

    const args = message.content.slice(client.prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command =
        client.oldcommands.get(cmd) ||
        client.oldcommands.find((cd) => cd.aliases && cd.aliases.includes(cmd));
    if (!command) return;
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const current_time = Date.now();
    const time_stamps = cooldowns.get(command.name);
    const cooldown_amount = command.cooldown * 1000 || 5000;

    if (time_stamps.has(message.author.id)) {
        const expiration_time =
            time_stamps.get(message.author.id) + cooldown_amount;

        if (current_time < expiration_time) {
            const time_left = (expiration_time - current_time) / 1000;

            return message.reply(
                `Please wait ${time_left.toFixed(
                    1
                )} more second(s) before reusing the \`${
                    command.name
                }\` command.`
            );
        }
    }
    if (!client.application?.owner) await client.application?.fetch();

    if (!message.author.id === client.application.owner.id){
        time_stamps.set(message.author.id, current_time);
        setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);
    }

    try {
        command.execute(message, args, client, Discord);
    } catch (err) {
        console.log(err);
        return message.channel.send(
            ` הייתה בעיה לבצע את הפקודה, אם תקלה זו חוזרת אנא פנה לסיני הגדול ` +
                '<@474584102335676427>'
        );
    }
};
