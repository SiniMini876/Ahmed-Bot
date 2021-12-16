const Discord = require("discord.js");
const { Client, Util, MessageEmbed, MessageAttachment } = require("discord.js");

module.exports = {
  name: "mute",
  aliases: ["m"],
  cooldown: 10,
  usage: "!mute <second(s) / minute(s) / hour(s)>",
  description: "אם אתה לא מוד \ OP אין לך שום סיבה להשתמש בזה, תקרא לסיני לעזרה",
  async execute(bot, msg, args, ms, mc){ 

        // creating a person variable
        var person = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[1]))
        if(!person) return;
  
        var mainrole = msg.guild.roles.cache.find(role => role.name === 'MEMBER');
        var muterole = msg.guild.roles.cache.find(role => role.name === 'MUTE');
        var policerole = msg.guild.roles.cache.find(role => role.name === 'POLICE');
        var shingrole = msg.guild.roles.cache.find(role => role.name === 'שינגעלינג');
        var shing = person.roles.cache.find(role => role.name === 'שינגעלינג');
        var OP = person.roles.cache.find(role => role.name === 'OP');
        
        // check if the member has OP role.
        if(!msg.member.roles.cache.find(r => r.name === "OP")) return msg.channel.send('סורי אחי, אין לך רשות לעשות מעשה שכזה. יבומר');
        
        // check if there is a role named MUTE
        if(!muterole) return msg.channel.send("סורי, לא מצאתי את הרול של המיוט");

        var time = args[2]
  
        if(!time) return msg.channel.send("אין זמן");

        person.roles.remove(mainrole.id);

        // check if the member has shingaling role
        if(shing){
          person.roles.remove(shingrole.id)};
        person.roles.add(muterole.id);
  
        msg.channel.send(`${person} הלך לישון ל ${ms(ms(time))}`)
        
        // after the time that the member write the bot gives the mute member his roles back.
        setTimeout(function(){
          person.roles.add(mainrole.id);
          if(shing){
            person.roles.add(shingrole.id)};
          person.roles.remove(muterole.id);
          msg.channel.send(`${person} קם מהשינה`)
        }, ms(time))
        msg.delete({ timeout: 5000 }).catch(console.error());

  }
}