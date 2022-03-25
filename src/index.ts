import Client from "./Client";

const client = new Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_VOICE_STATES",
        "GUILD_MESSAGE_TYPING",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_BANS",
        "GUILD_PRESENCES",
        "GUILD_INVITES",
        "GUILD_MESSAGE_REACTIONS",
        "DIRECT_MESSAGE_REACTIONS"
    ],
    partials: [
        "CHANNEL",
        "GUILD_MEMBER",
        "GUILD_SCHEDULED_EVENT",
        "MESSAGE",
        "REACTION",
        "USER"
    ]
});

client.init();