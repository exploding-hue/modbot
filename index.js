const Discord = require("discord.js");
const fs = require("fs");
const config = require('./config.json')
const prefix = config.prefix;
const bot = new Discord.Client({disableMentions:'everyone'});
bot.prefix = prefix;
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");
["command","server"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});
bot.on('ready',()=>{
    require('./events/client/ready')(bot)
})
bot.on('message',async message=>{
    message.member //-- GuildMember based
    message.author //-- User based
    require('./events/guild/message')(bot,message)
})
const token = require(`./token.json`)
bot.login(token.Token)
bot.on("ready", () => {
    function randomStatus() {
      let Playstatus = ["no.", "simon says", "Astro Arcade", "Minecraft", "Visual Studio Code", "Astro Development", "Atlantis", "Thonker", "Dodge", "Zeekz New Game"]
      let Pstatus = Math.floor(Math.random() * Playstatus.length);
      
      // bot.user.setActivity(status[rstatus], {type: "WATCHING"}); 
      // You can change the "WATCHING" into STREAMING, LISTENING, and PLAYING.
      // Example: streaming
      
      bot.user.setActivity(Playstatus[Pstatus], {type: "PLAYING",});
    }; setInterval(randomStatus, 7000) // Time in ms. 30000ms = 30 seconds. Min: 20 seconds, to avoid ratelimit.

    
    console.log(`Astro Utilities is now online on ${bot.guilds.cache.size} servers`)

})
