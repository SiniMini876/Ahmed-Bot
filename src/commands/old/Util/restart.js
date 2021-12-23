const Discord = require('discord.js');
const { Client, Util, MessageEmbed, MessageAttachment } = require('discord.js');
const axios = require('axios');
const github_auth_key = process.env.github_auth_key;
const workflow_id = process.env.workflow_id;
const githubapi_url = process.env.githubapi_url;

module.exports = {
    name: 'restart',
    cooldown: 60,
    usage: '!restart',
    description: 'The bot restarts, should take a couple of minutes',
    async execute(msg, args, client, Discord) {
        msg.channel.send('The bot will be online soon, wait like 3 minutes ✅');

        axios({
            method: 'POST',
            url: githubapi_url + `/actions/workflows/${workflow_id}/dispatches`,
            headers: {
                Authorization: `Bearer ${github_auth_key}`,
                Accept: 'application/vnd.github.v3+json',
                'X-RateLimit-Limit': 5000,
                'Content-Type': 'application/json',
            },
            data: {
                ref: 'main',
            },
        });
    },
};
