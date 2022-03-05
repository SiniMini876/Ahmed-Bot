import { Client, Message } from "discord.js";

export default async (bot: Client, msg: Message) => {
    if (msg.content === "שתוק כבר אחמד") {
        msg.channel.send("לא משנה אני מצטער על נכותי");
    }

    if (msg.content === "אחמד") {
        msg.channel.send("אה כפרע");
    }

    if (msg.content === "אחמד מריו") {
        msg.channel.send("https://www.youtube.com/watch?v=nOCgjuu0xeA");
    }

    if (msg.content === "שלום") {
        msg.channel.send("השלום לך");
    }

    if (msg.content === "נאד קטין") {
        msg.channel.send("נאד ענק הוא המלך");
    }

    if (msg.content === "אמשך") {
        msg.channel.send("כל כך שמנה");
    }

    if (msg.content === "שו האדא") {
        msg.channel.send("אנא אחמד");
    }

    if (msg.content === "חנאן כותב יומן") {
        msg.channel.send("איזה טמבל");
    }

    if (msg.content === "טמבל") {
        msg.channel.send("חנאן כותב יומן");
    }

    if (msg.content === "בוט") {
        msg.channel.send("וואלאק אני אחמד הבוט הכי גבר");
    }

    if (msg.content === "סתום תפה אחמד") {
        msg.channel.send(
            "יגזענן רק בגלל שקוראים לי אחמד אתה מייחס אליי ככה נכון?!!!!!!"
        );
    }

    if (msg.content === "ip") {
        msg.channel.send("nod_anak.aternos.me");
    }
};
