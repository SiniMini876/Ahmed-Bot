export default {
    name: "clear",
    aliases: ["c"],
    cooldown: 10,
    usage: "!clear `<number of messages>`",
    description: "The bot deletes x messages.",

    execute: async (bot, msg, args) => {
        if(!msg.member.permissions.has("MANAGE_MESSAGES")) return msg.channel.send('סורי אחי, אין לך רשות לעשות מעשה שכזה. יבומר');
        if(!args[1]) return msg.channel.send('תגיד כמה הודעות למחוק יאפס')
        msg.channel.bulkDelete(args[1]).catch(console.error);
    }

}