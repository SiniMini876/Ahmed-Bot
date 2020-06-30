const Discord = require("discord.js");
const { Client, Util, MessageEmbed, MessageAttachment } = require("discord.js");
const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const dotenv = require("dotenv").config();
const TOKEN = process.env.BOT_TOKEN;
const GOOGLE_API_KEY = process.env.YTAPI_KEY;
const PREFIX = process.env.PREFIX;
const cooldown = new Set();
const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();

exports.run = async(bot, msg, args) => {
    if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        return msg.channel.send("⏸  **|**  הפסקתי את המוזיקה בשבילך, ידידי הצעיר");
      }msg.delete({ timeout: 5000 }).catch(console.error);
      return msg.channel.send("אין שום מוזיקה מתנגנת כרגע");
}