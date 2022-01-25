import express from "express";
const app = express();
let PORT = process.env.PORT as string | 4500;

export const web = {
    execute: async () => {
        app.use(express.static(__dirname));
        app.get("/", function (req, res) {
            res.sendFile(__dirname + "/index.html");
        });

        app.listen(PORT, () => {
            // eslint-disable-next-line no-console
            console.log(`Ahmed is running on port ${PORT}`);
        });
    },
};
