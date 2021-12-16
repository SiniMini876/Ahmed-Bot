const Discord = require('discord.js');
const { Client, Util, MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
    name: "kesem",
    aliases: ["k"],
    cooldown: 5,
    description: "אתה שואל שאלת כן ולא והבוט שולח תשובה רנדומלית",
    async execute(bot, msg, args,){

        if(!args[2]) return msg.reply('תשאל שאלה נורמלית בן אדם');
        let replies = ['כן', 'לא', 'אני לא יודע, מה אני יעשה', 'תשאל מאוחר יותר אני נכה מידי כרגע'];

        let result = Math.floor((Math.random() * replies.length));
        let question = args.slice(1).join(' ');

        let ballembed = new Discord.MessageEmbed()
        .setTitle('קונכיית הקסם!')
        .setFooter(msg.author.username)
        .setColor('#FF9900')
        .addField('שאלה', question)
        .addField('תשובה', replies[result])
        .setThumbnail('https://i.kym-cdn.com/photos/images/masonry/000/355/434/560.gif');
        

        msg.channel.send(ballembed);
    }
}