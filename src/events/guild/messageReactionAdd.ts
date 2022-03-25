/* eslint-disable no-console */
import { Guild, MessageReaction, User } from "discord.js";
import Client from "../../Client";
import { Event } from "../../Interfaces";

export const event: Event = {
    name: "messageReactionAdd",
    execute: async (client: Client, reaction: MessageReaction, user: User) => {
        let applyRole = async () => {
            let emojiName = reaction.emoji.name as string;
            let guild = reaction.message.guild as Guild;
            if (guild.id === "693864294911049829") {
                // buganim
                let role = guild.roles.cache.find(
                    (role) =>
                        role.name.toLowerCase() === emojiName.toLowerCase()
                );
                let member = guild.members.cache.find(
                    (member) => member.id === user.id
                );

                try {
                    if (role && member) {
                        console.log("Role and Member are found. -- BUGANIM");
                        await member.roles.add(role);
                        console.log(
                            "The member has given the role \"Member\". -- BUGANIM"
                        );
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            if (guild.id === "805361587103203378") {
                // Almo
                let role = guild.roles.cache.find(
                    (role) => role.id === "805364807427162132"
                );
                let member = guild.members.cache.find(
                    (member) => member.id === user.id
                );

                try {
                    if (role && member) {
                        console.log("Role and Member are found. -- ALMO");
                        await member.roles.add(role);
                        console.log(
                            "The member has given the role \"Member\". -- ALMO"
                        );
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            if (reaction.message.id === "956852427473162303") {
                const role = await guild.roles.fetch("955487947820499004");
                const member = await guild.members.fetch(user.id);

                if (!member || !role) return;

                if (reaction.emoji.id !== "760410966235021322") return;

                try {
                    await member.roles.add(role);
                } catch (err) {
                    console.log(err);
                }
            }
        };

        if (reaction.message.partial) {
            try {
                let msg = await reaction.message.fetch();
                if (msg.id === "730381895132643328") {
                    //buganim
                    applyRole();
                }
                if (msg.id === "819698938658553906") {
                    // Almo
                    applyRole();
                }
                if (msg.id === "956852427473162303") {
                    // sharpesha
                    applyRole();
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            if (reaction.message.id === "730381895132643328") {
                //buganim
                applyRole();
            }
            if (reaction.message.id === "819698938658553906") {
                // Almo
                applyRole();
            }
            if (reaction.message.id === "956852427473162303") {
                // sharpesha
                applyRole();
            }
        }
    },
};
