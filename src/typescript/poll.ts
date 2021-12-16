export default {
    name: "poll",
    aliases: [""],
    cooldown: 5,
    description: "הבוט פותח סקר",
    usage: "poll <the poll title>",
    execute: async(bot, msg, args,) => {
        if(args[1]){
            let msgArgs = args.slice(1).join(" ");
            msg.channel.send("📋 " + "**" + msgArgs + "**").then(messageReaction => {
            messageReaction.react("👍");
            messageReaction.react("👎");
            msg.delete({ timeout: 5000 }).catch(console.error);
        })}
    }
}