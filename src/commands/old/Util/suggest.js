const Discord = require('discord.js');
const { Client, Util, MessageEmbed, MessageAttachment } = require("discord.js");
module.exports = {
    name: "suggest",
    aliases: ["sug"],
    cooldown: 10,
    usage: "!suggest `<The thing that you want to suggest>`",
    description: "Creates a suggestion for something, the suggestion will sent to the Mods.",
    async execute(bot, msg, args){
        if(!args.length) return msg.channel.send('תכתוב את ההצעה')
        let channel = msg.guild.channels.cache.find(c => c.id === '816582689808318484');

        let embed = new MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
        .setTitle(args.slice(1).join(' '))
        .setTimestamp();

        const message = await channel.send(embed)

        message.react('✅')
        message.react('❌')

        msg.delete()
    }
}