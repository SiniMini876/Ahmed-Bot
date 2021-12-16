const Discord = require('discord.js');
const { Client, Util, MessageEmbed, MessageAttachment } = require("discord.js");
exports.run = async(bot, msg) => {
    if(msg.content === 'שתוק כבר אחמד'){
        msg.channel.send('לא משנה אני מצטער על נכותי')}

    if(msg.content === 'אחמד'){
        msg.channel.send('אה כפרע')}

    if(msg.content === 'אחמד זה שם מגניב'){
        var OPS = ['474584102335676427', '256453875635191810'];
        if(OPS.includes(msg.author.id)) return msg.channel.send('אתה יותר מידי טוב בשבילי, אני פורש');
        var nickname = msg.member.nickname;
        msg.member.setNickname('אחמד השתלט עליך').then(setTimeout(function(){ msg.member.setNickname(nickname) }, 30000)); }

    if(msg.content === "אחמד מריו"){
        msg.channel.send("https://www.youtube.com/watch?v=nOCgjuu0xeA")}

    if(msg.content === "שלום"){
        msg.channel.send("השלום לך")}

    if(msg.content === "נאד קטין"){
        msg.channel.send("נאד ענק הוא המלך")}

    if(msg.content === "אמשך"){
        msg.channel.send("כל כך שמנה")}

    if(msg.content === "שו האדא"){
        msg.channel.send("אנא אחמד")}

    if(msg.content === "חנאן כותב יומן"){
        msg.channel.send("איזה טמבל")}

    if(msg.content === "טמבל"){
        msg.channel.send("חנאן כותב יומן")}

    if(msg.content === "בוט"){
        msg.channel.send("וואלאק אני אחמד הבוט הכי גבר")}

    if(msg.content === "סתום תפה אחמד"){
        msg.channel.send("יגזענן רק בגלל שקוראים לי אחמד אתה מייחס אליי ככה נכון?!!!!!!")}
        
    if(msg.content === "ip"){
        msg.channel.send("nod_anak.aternos.me")}

    if(msg.content === 'אגדו'){
        msg.channel.send('אני קופץ מצוק.')
        bot.destroy();
        setTimeout(function(){
            msg.channel.send('חזרתי מהגהינום, אפיק למדי')
        }, 10000)
        bot.login(process.env.BOT_TOKEN)
        bot.user.setActivity('להרביץ ליהודים', { type: "PLAYING"}).catch(console.error);
    }
}