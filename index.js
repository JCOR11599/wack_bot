const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const http = require("https");
const fs = require('fs');
require("dotenv").config();

// Initialize options for http request to function
var options = {
	"method": "GET",
	"hostname": "ronreiter-meme-generator.p.rapidapi.com",
	"port": null,
	"path": "/meme?top=Top%20Text&bottom=Bottom%20Text&meme=Condescending-Wonka&font_size=50&font=Impact",
	"headers": {
		"x-rapidapi-host": "ronreiter-meme-generator.p.rapidapi.com",
		"x-rapidapi-key": process.env.KEY,
		"useQueryString": true
	}
};

const prefix = '/';

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (msg) => {
    // ignore non-commands and messages from bots
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    // extract command and arguments
    const args = msg.content.slice(prefix.length).split(" ");
    const cmd  = args.shift();

    // handle commands accordingly
    switch (cmd) {
        case 'ping':
            msg.reply('pong');
            break;
        case 'meme':
            let q = args.join(' ').split(';');
            options["path"] = `/meme?meme=${encodeURIComponent(q[0])}&top=${encodeURIComponent(q[1])}&bottom=${encodeURIComponent(q[2])}`;
            let req = http.request(options, function (res) {
                let chunks = [];
                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });
                res.on("end", function () {
                    let body = Buffer.concat(chunks);
                    let file = new Discord.MessageAttachment(body, 'meme.jpeg');
                    msg.reply({
                        files: [file]
                    });
                });
            });
            req.end();
            break;
        case 'poll':
            msg.reply('ass');
            break;
        case 'horny':
            msg.reply("ask Justin");
            break;
    }


});

client.login(process.env.TOKEN);