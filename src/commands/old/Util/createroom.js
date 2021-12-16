module.exports = {
	name: 'createroom',
    aliases: ['cr'],
    cooldown: 5,
	description: 'הבוט פותח חדר חדש ננדש רק לכם ולמי שתרצו שתכניסו',
    usage: 'createroom <כמה אנשים בחדר>',
    usage2: 'cr <כמה אנשים בחדר>',
    async execute(client, msg, args) {
        if (!args[1])
            return msg.channel.send("אתה צריך לכתוב את המקסימום אנשים לחדר.");

        const newVoiceChannel = await msg.guild.channels.create(
            `חדר פרטי - ${msg.author.username} -  ${args[1]}`,
            {
                type: "voice",
                parent: "719179244781043813",
                userLimit: args[1],
            }
        );
        const voiceChannel = msg.guild.channels.cache.find(
            (c) => c.id === newVoiceChannel.id
        );
        if(msg.member.voice.channel){
            msg.member.voice.setChannel(voiceChannel);
        }

        const inviteVoice = await voiceChannel.createInvite({
            maxAge: 15,
            maxUses: args[1],
            reason: `Private room for ${msg.member}`,
        });

        const inviteURL = await msg.channel.send(inviteVoice.url);

        msg.delete();
        setInterval(() => {
                if(msg.guild.channels.cache.find(c => c.id === voiceChannel.id)){
                    if (voiceChannel.members.array().length === 0) {
                        voiceChannel.delete().catch();
                        inviteURL.delete().catch();
                        return;
                        } else if(voiceChannel.full) {
                            voiceChannel.overwritePermissions([{
                                    id: '720677306036781218',
                                    deny: ['VIEW_CHANNEL'],
                                },{
                                    id: msg.author.id,
                                    allow: ['VIEW_CHANNEL', 'MOVE_MEMBERS']
                                }], 'The channel is full');
                        } else {
                            voiceChannel.overwritePermissions([{
                                id: '474584102335676427',
                                allow: ['VIEW_CHANNEL'],
                            }], 'The channel is NOT full');
                        }
                    } else return;
            }, 5000);
        
    }
};
