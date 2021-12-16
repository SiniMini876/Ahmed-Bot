import { MessageEmbed } from "discord.js";
import superagent from "superagent";

export default {
    run: async (bot, textChannel) => {
        let { body } = await superagent.get(`https://random.dog/woof.json`);

        let dogembed = new MessageEmbed()
            .setColor('#FF9900')
            .setTitle('Random Dog Every 24 hours :dog:')
            .setImage(body.url);

        textChannel.send(dogembed);
    },
};
