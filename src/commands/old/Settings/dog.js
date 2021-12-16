const Discord = require('discord.js');
const { Client, Util, MessageEmbed, MessageAttachment } = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, textChannel) => {
        
        let {body} = await superagent.get(`https://random.dog/woof.json`);

        let dogembed = new Discord.MessageEmbed()
        .setColor("#FF9900")
        .setTitle("Random Dog Every 24 hours :dog:")
        .setImage(body.url);

        textChannel.send(dogembed);

    }