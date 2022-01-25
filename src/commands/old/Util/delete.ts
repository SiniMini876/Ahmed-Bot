import {
    ClientApplication,
    Guild,
    Message,
    MessageCollector,
    User,
} from "discord.js";
import Client from "../../../Client";
import { Command } from "../../../Interfaces";

export const command: Command = {
    name: "delete",
    async execute(client: Client, message: Message) {
        if (!client.application?.owner) await client.application?.fetch();

        let owner = client.application?.owner as User;

        if (message.author.id === owner.id) {
            let app = client.application as ClientApplication;
            let listener = new MessageCollector(message.channel);
            let guild = message.guild as Guild;
            message.channel.send("Are you sure you want to delete ALL OF THE COMMANDS? -- answer with `yes` or `no`");
            listener.on("collect", (msg: Message) => {
                if(msg.author.id !== owner.id) return;
                if(msg.content === "yes"){
                    app.commands.set([], guild.id);
                    msg.reply("All of the slash commends are deleted!");
                }
                if(msg.content == "no") {
                    msg.reply("The opertation stopped!");
                }
                return listener.stop();
            });
        }
    },
};
