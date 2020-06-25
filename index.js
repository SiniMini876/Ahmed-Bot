const Discord = require("discord.js");
const { Client, Util, MessageEmbed, MessageAttachment } = require("discord.js");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const dotenv = require("dotenv").config();
require("./server.js");

const TOKEN = process.env.BOT_TOKEN;
const PREFIX = process.env.PREFIX;
const GOOGLE_API_KEY = process.env.YTAPI_KEY;
const cooldown = new Set();

const bot = new Client({
  disableMentions: "all"
});

const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();

bot.on("warn", console.warn);
bot.on("error", console.error);
bot.on("ready", () =>
  console.log(`${bot.user.tag} has been successfully turned on!`)
);

bot.on('ready', () => {
    console.log('This bot is active!');
    bot.user.setActivity('NOD ANAK', { type: "PLAYING"}).catch(console.error);
})

bot.on('guildMemberAdd', member =>{

    const channel = member.guild.channels.cache.find(channel => channel.name === "welcome");
    if(!channel) return;

    channel.send(`? ${channel}מה המצב`)

});

bot.on("shardDisconnect", (event, id) =>
  console.log(
    `Shard ${id} disconnected (${event.code}) ${event}, trying to reconnect!`
  )
);
bot.on("shardReconnecting", id => console.log(`Shard ${id} reconnecting...`));

bot.on('message', message => {
    if(message.content === "שלום"){
        message.channel.send("השלום לך")}
    if(message.content === "נאד קטין"){
        message.channel.send("נאד ענק הוא המלך")}
    if(message.content === "אמשך"){
        message.channel.send("כל כך שמנה")}
    if(message.content === "שו האדא"){
        message.channel.send("אנא אחמד")}
    if(message.content === "חנאן כותב יומן"){
        message.channel.send("איזה טמבל")}
    if(message.content === "טמבל"){
        message.channel.send("חנאן כותב יומן")}
    if(message.content === "בוט"){
        message.channel.send("וואלאק אני אחמד הבוט הכי גבר")}
    if(message.content === "סתום תפה אחמד"){
        message.channel.send("יגזענן רק בגלל שקוראים לי אחמד אתה מייחס אליי ככה נכון?!!!!!!")}
    if(message.content === "ip"){
        message.channel.send("nod_katin.aternos.me")}
    let args = message.content.slice(PREFIX.length).split(" ");
    switch (args[0]){
        case 'poll':
            const Embd = new MessageEmbed()
            .setColor(0x00BDFF)
            .setTitle("מדריך הכנת סקרים בשרת נאד יפה")
            .setDescription("וואלק תכתוב poll ואז את השאלה שאתה רוצה לשאול")
        
            if(!args[1]){
                message.author.send(Embd);
                message.delete({ timeout: 5000 }).catch(console.error);
            }
            if(args[1]){
                let msgArgs = args.slice(1).join(" ");
                message.channel.send("📋 " + "**" + msgArgs + "**").then(messageReaction => {
                    messageReaction.react("👍");
                    messageReaction.react("👎");
                    message.delete({ timeout: 5000 }).catch(console.error);
                })}

            break;
        case 'אני':
            if(!args[1]){
                return;}
                if(args[1]){
                message.channel.send(`שלום לך ${args[1]} אני אחמד`)
            }
            break;
        }
});

bot.on("message", async msg => {
  // eslint-disable-line
  if (msg.author.bot) return;
  if (!msg.content.startsWith(PREFIX)) return;

  const args = msg.content.split(" ");
  const searchString = args.slice(1).join(" ");
  const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
  const serverQueue = queue.get(msg.guild.id);

  let command = msg.content.toLowerCase().split(" ")[0];
  command = command.slice(PREFIX.length);

  if (command === "help" || command == "cmd") {
    const helpembed = new Discord.MessageEmbed()
      .setColor("#7289DA")
      .setDescription(
        `
__**Commands List**__

**Poll Commands List**
> \`poll\` = help for the poll feature 

**Music Bot Commands List**
> \`play\` > **\`play [title/url]\`**
> \`search\` > **\`search [title]\`**
> \`skip\`, \`stop\`,  \`pause\`, \`resume\`
> \`nowplaying\`, \`queue\`, \`volume\``
      )
      .setFooter(
        "©️ SiniMini876",
      );
    msg.author.send(helpembed);
    msg.delete({ timeout: 5000 }).catch(console.error);
  }
  if (command === "play" || command === "p") {
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel)
      return msg.channel.send(
        "תקשיב, אני צריך שתהיה בחדר שמע כדי שאשמיע לך. מה אני קוסם?"
      );
      msg.delete({ timeout: 5000 }).catch(console.error);
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.send(
        "Sorry, but I need **`CONNECT`** permissions to proceed!"
      );
    }msg.delete({ timeout: 5000 }).catch(console.error);
    if (!permissions.has("SPEAK")) {
      return msg.channel.send(
        "Sorry, but I need **`SPEAK`** permissions to proceed!"
      );
    }msg.delete({ timeout: 5000 }).catch(console.error);
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return msg.channel.send(
        `<:yes:591629527571234819>  **|**  Playlist: **\`${playlist.title}\`** has been added to the queue!`
      );
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 10);
          var video = await youtube.getVideoByID(videos[0].id);
          if (!video)
            return msg.channel.send(
              "🆘  **|**  לא מצאתי כלום, תחפש משהו אחר כי אם לא אני אפליץ עליך"
            );
        } catch (err) {
          console.error(err);
          return msg.channel.send(
            "🆘  **|**  לא מצאתי כלום, תחפש משהו אחר כי אם לא אני אפליץ עליך"
          );
        }
      }
      return handleVideo(video, msg, voiceChannel);
    }
  }
  if (command === "search" || command === "sc") {
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel)
      return msg.channel.send(
        "תקשיב, אני צריך שתהיה בחדר שמע כדי שאשמיע לך. מה אני קוסם?"
      );msg.delete({ timeout: 5000 }).catch(console.error);
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT")) {
      return msg.channel.send(
        "Sorry, but I need **`CONNECT`** permissions to proceed!"
      );
    }
    if (!permissions.has("SPEAK")) {
      return msg.channel.send(
        "Sorry, but I need **`SPEAK`** permissions to proceed!"
      );
    }
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
      const playlist = await youtube.getPlaylist(url);
      const videos = await playlist.getVideos();
      for (const video of Object.values(videos)) {
        const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
        await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
      }
      return msg.channel.send(
        `<:yes:591629527571234819>  **|**  Playlist: **\`${playlist.title}\`** has been added to the queue!`
      );
    } else {
      try {
        var video = await youtube.getVideo(url);
      } catch (error) {
        try {
          var videos = await youtube.searchVideos(searchString, 10);
          let index = 0;
          msg.channel.send(`
__**Song selection**__

${videos.map(video2 => `**\`${++index}\`  |**  ${video2.title}`).join("\n")}

Please provide a value to select one of the search results ranging from 1-10.
					`);
          // eslint-disable-next-line max-depth
          try {
            var response = await msg.channel.awaitMessages(
              msg2 => msg2.content > 0 && msg2.content < 11,
              {
                max: 1,
                time: 10000,
                errors: ["time"]
              }
            );
          } catch (err) {
            console.error(err);
            return msg.channel.send(
              "לא מצאתי מענה נכון לבחירת השיר, תנסה לחפש שוב"
            ); msg.delete({ timeout: 5000 }).catch(console.error);
          }
          const videoIndex = parseInt(response.first().content);
          var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
        } catch (err) {
          console.error(err);
          return msg.channel.send(
            "🆘  **|**  לא מצאתי תוצאות בחיפוש תנסה לחפש משהו אחר ינעל דינאק"
          ); msg.delete({ timeout: 5000 }).catch(console.error);
        }
      }
      return handleVideo(video, msg, voiceChannel);
    }
  } else if (command === "skip") {
    if (!msg.member.voice.channel)
      return msg.channel.send(
        "תקשיב, אני צריך שתהיה בחדר שמע כדי שאמשימע לך. מה אני קוסם?"
      );msg.delete({ timeout: 5000 }).catch(console.error);
    if (!serverQueue)
      return msg.channel.send(
        "אין שום שיר שאני אוכל להעביר לך"
      );msg.delete({ timeout: 5000 }).catch(console.error);
    serverQueue.connection.dispatcher.end("Skip command has been used!");
    return msg.channel.send("⏭️  **|**  Skip command has been used!");
  } else if (command === "stop") {
    if (!msg.member.voice.channel)
      return msg.channel.send(
        "תקשיב, אני צריך שתהיה בחדר שמע כדי שאמשימע לך. מה אני קוסם?"
      );msg.delete({ timeout: 5000 }).catch(console.error);
    if (!serverQueue)
      return msg.channel.send(
        "אין שום שיר שאני אוכל להעביר לך"
      );msg.delete({ timeout: 5000 }).catch(console.error);
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("Stop command has been used!");
    return msg.channel.send("⏹️  **|**  הפסקתי את השיר בשבילך, איזה גבר אני");
  } else if (command === "volume" || command === "vol") {
    if (!msg.member.voice.channel)
      return msg.channel.send(
        "תקשיב, אני צריך שתהיה בחדר שמע כדי שאמשימע לך. מה אני קוסם?"
      );msg.delete({ timeout: 5000 }).catch(console.error);
    if (!serverQueue) return msg.channel.send("אין שום מוזיקה במתנגנת כרגע");
    if (!args[1])
      return msg.channel.send(
        `עוצמת השמע שלך כרגע היא: **\`${serverQueue.volume}%\`** אם ברצונך לשנות אותה תכתוב volume ואז את העוצמה שאתה רוצה )העוצמה נקבעת אך ורק מ1 ל100)`
      );
    if (isNaN(args[1]) || args[1] > 100)
      return msg.channel.send(
        "עוצמת שמע יכולה להיקבע רק על פי **1** - **100**"
      );msg.delete({ timeout: 5000 }).catch(console.error);
    serverQueue.volume = args[1];
    serverQueue.connection.dispatcher.setVolume(args[1] / 100);
    return msg.channel.send(`I set the volume to: **\`${args[1]}%\`**`);
  } else if (command === "nowplaying" || command === "np") {
    if (!serverQueue) return msg.channel.send("אין שום מוזיקה מתנגנת כרגע");
    return msg.channel.send(
      `🎶  **|**  Now Playing: **\`${serverQueue.songs[0].title}\`**`
    );
  } else if (command === "queue" || command === "q") {
    if (!serverQueue) return msg.channel.send("אין שום מוזיקה מתנגנת כרגע");
    return msg.channel.send(`
__**Song Queue**__

${serverQueue.songs.map(song => `**-** ${song.title}`).join("\n")}

**Now Playing: \`${serverQueue.songs[0].title}\`**
        `);msg.delete({ timeout: 5000 }).catch(console.error);
  } else if (command === "pause") {
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return msg.channel.send("⏸  **|**  הפסקתי את המוזיקה בשבילך, ידידי הצעיר");
    }msg.delete({ timeout: 5000 }).catch(console.error);
    return msg.channel.send("אין שום מוזיקה מתנגנת כרגע");
  } else if (command === "resume") {
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return msg.channel.send("▶  **|**  הפעלתי את המוזיקה בשבילך, ידידי הצעיר");
    }msg.delete({ timeout: 5000 }).catch(console.error);
    return msg.channel.send("אין שום מוזיקה מתנגנת כרגע");
  } else if (command === "loop") {
    if (serverQueue) {
      serverQueue.loop = !serverQueue.loop;
      return msg.channel.send(
        `:repeat: **|** Loop ${
          serverQueue.loop === true ? "enabled" : "disabled"
        }!`
      );msg.delete({ timeout: 5000 }).catch(console.error);
    }
    return msg.channel.send("אין שום מוזיקה מתנגנת כרגע");
    msg.delete({ timeout: 5000 }).catch(console.error);
  }
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
  const serverQueue = queue.get(msg.guild.id);
  const song = {
    id: video.id,
    title: Util.escapeMarkdown(video.title),
    url: `https://www.youtube.com/watch?v=${video.id}`
  };
  if (!serverQueue) {
    const queueConstruct = {
      textChannel: msg.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 100,
      playing: true,
      loop: false
    };
    queue.set(msg.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(msg.guild, queueConstruct.songs[0]);
    } catch (error) {
      console.error(`I could not join the voice channel: ${error}`);
      queue.delete(msg.guild.id);
      return msg.channel.send(
        `I could not join the voice channel: **\`${error}\`**`
      );
    }
  } else {
    serverQueue.songs.push(song);
    if (playlist) return;
    else
      return msg.channel.send(
        `<:yes:591629527571234819>  **|** **\`${song.title}\`** has been added to the queue!`
      );
  }
  return;
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);

  if (!song) {
    serverQueue.voiceChannel.leave();
    return queue.delete(guild.id);
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      const shiffed = serverQueue.songs.shift();
      if (serverQueue.loop === true) {
        serverQueue.songs.push(shiffed);
      }
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolume(serverQueue.volume / 100);
  
  if(!song.url === 'https://www.youtube.com/watch?v=MK3DWfKJK6I')
    serverQueue.textChannel.send({
      embed: {
      color: "RANDOM",
      description: `🎶  **|**  Start Playing: **\`${song.title}\`**`
    }
  });
}

bot.login(TOKEN);
