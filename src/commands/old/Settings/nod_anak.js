const Discord = require("discord.js");
const { Client, Util, MessageEmbed, MessageAttachment } = require("discord.js");
const { response, text } = require("express");

module.exports = {
    run: async(bot, mc, textChannel) => {
        mc('nod_anak.aternos.me', 25565, (error, response) => {
            if(error) throw error
            if(response.descriptionText = '§4This server is offline.\n§7powered by aternos.org'){
                const nodemOF = new Discord.MessageEmbed()
                .setTitle('**שיט על השרת כל שעתיים כי אני מגניב:)**')
                .addField('מצב השרת', 'Offline')
                .addField('הIP של השרת', response.host)
                .setThumbnail('https://cdn.discordapp.com/attachments/725621195214684220/732626581620785206/coollogo_com-213421466.png')
                textChannel.send(nodemOF);
            }else{
                const nodemON = new Discord.MessageEmbed()
                .setTitle('**שיט על השרת כל שעתיים כי אני מגניב:)**')
                .addField('מצב השרת', 'Online')
                .addField('הIP של השרת', response.host)
                .addField('גרסת המיינקראפט של השרת', response.version)
                .addField('מספר אנשים מחוברים', response.onlinePlayers)
                .setThumbnail('https://cdn.discordapp.com/attachments/725621195214684220/732626581620785206/coollogo_com-213421466.png')
                textChannel.send(nodemON);

            }
        
        })
        }
}
