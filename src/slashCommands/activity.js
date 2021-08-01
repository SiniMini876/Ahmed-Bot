const wait = require('util').promisify(setTimeout);
const fetch = require('node-fetch');
require('dotenv').config();

module.exports = {
    name: 'activity',
    description: 'Let\'s you create an Activity in a VC!',
    async execute(client, interaction, member, channel, guild) {
        let returnData = {
            code: 'none',
        };

        const VCchannel = guild.channels.cache.find(
            (c) => c.id === interaction.options.getChannel('channel').id
        );

        if (VCchannel.type !== "GUILD_VOICE") {
            return interaction.editReply(
                'You must select a Voice Channel!'
            );
        }

        await fetch(
            `https://discord.com/api/v8/channels/${VCchannel.id}/invites`,
            {
                method: 'POST',
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id:
                        interaction.options.getString('activity'),
                    target_type: 2,
                    temporary: false,
                    validate: null,
                }),
                headers: {
                    Authorization: `Bot ${process.env.BOT_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        )
            .then((res) => res.json())
            .then((invite) => {
                if (invite.error || !invite.code)
                    throw new Error('An error occured while retrieving data !');
                if (invite.code === 50013 || invite.code === '50013')
                    console.warn(
                        'Your bot lacks permissions to perform that action'
                    );
                returnData.code =
                    `https://discord.com/invite/${invite.code}` +
                    ' **To start the activity, press this link!**';
            });

        interaction.editReply(returnData.code, { ephemeral: false });
    },
};
