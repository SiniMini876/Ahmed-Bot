const { MessageEmbed } = require('discord.js');
require('dotenv').config();
const axios = require('axios');
const github_auth_key = process.env.github_auth_key;
const workflow_id = process.env.workflow_id;
const githubapi_url = process.env.githubapi_url;

module.exports = {
    name: 'restart',
    description: 'The bot restarts, should take a couple of minutes',
    async execute(client, interaction, member, channel, guild) {
        interaction.editReply('The bot will be online soon, wait like 3 minutes ✅');

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
