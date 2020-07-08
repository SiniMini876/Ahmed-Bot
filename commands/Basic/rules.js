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

module.exports = {
    name: 'rules',
    catagory: 'Basic',
    description: "Get some help",
    usage: "ping",
    run: (bot, msg, args) => { 
    msg.channel.send("**כדי להצטרף לשרת אנא הישבע אמונים לצ'ינגאצ'וג על ידי לחיצה על האימוג'י המפחיד שמתחת להודעה.**");
    msg.delete({ timeout: 5000 }).catch(console.error);
  }
}