const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
require("dotenv").config();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (msg) => {
    // ignore messages from bots
    if (msg.author.bot) return;

    
    if (msg.content === 'ping') {
        msg.reply('pong');
    }
})

client.login(process.env.TOKEN);