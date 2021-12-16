const Discord = require('discord.js');
const { Client, Util, MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    name: "clear",
    aliases: ["c"],
    cooldown: 10,
    usage: "!clear `<number of messages>`",
    description: "The bot deletes x messages.",
    async execute(bot, msg, args){
        if(!msg.member.permissions.has("MANAGE_MESSAGES")) return msg.channel.send('סורי אחי, אין לך רשות לעשות מעשה שכזה. יבומר');
        if(!args[1]) return msg.channel.send('תגיד כמה הודעות למחוק יאפס')
        msg.channel.bulkDelete(args[1]).catch(console.error);
    }
}