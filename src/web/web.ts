/* eslint-disable no-console */
import express from "express";
import path from "path";
const app = express();
let PORT = process.env.PORT as string | 4500;

export const web = {
    execute: async () => {

        let dir = __dirname.slice(0, -8);

        let pathHtml = path.join(dir + "/src/web/index.html");

        let dirPath = path.join(dir + "/src/web/");

        app.use(express.static(dirPath));
        app.get("/", function (req, res) {
            res.sendFile(pathHtml);
        });

        app.listen(PORT, () => {
            console.log(`Ahmed is running on port ${PORT}`);
        });
    },
};
