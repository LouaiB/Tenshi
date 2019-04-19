const kanadeCommand = require("./commands/KanadeCommand");
const tenshiCommand = require("./commands/TenshiCommand");
const speakCommand = require("./commands/SpeakCommand");
const recommendCommand = require("./commands/RecommendCommand");
const smugCommand = require("./commands/SmugCommand");
const musicCommand = require("./commands/MusicCommand");
const goodnightCommand = require("./commands/GoodnightCommand");
const weatherCommand = require("./commands/WeatherCommand");
const animeCommand = require("./commands/AnimeCommand");
const helpCommand = require("./commands/HelpCommand");
const jishoCommand = require("./commands/JishoCommand");

const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const activitiesJson = require("./json/activities");
const randJsonItem = require("./imports/randJsonItem");

const bot = new Discord.Client({disableEveryone: true});

try{
    // Ready
    bot.on("ready", async () => {
            console.log(`${bot.user.username} is online`);

            setInterval( () => {
                bot.user.setActivity( randJsonItem.getRandomItem(activitiesJson) );
            }, 5 * 60 * 1000);
            
    });

    // Message
    bot.on("message", async message => {
        if(message.author.bot) return;
        //if(message.channel.type === "dm") return;

        const prefix = botconfig.prefix;
        const channel = message.channel;

        const messageWords = message.content.split(" ");
        const command = messageWords[0];
        const arg = messageWords.slice(1).join(" ");

        switch(command){
            case prefix + "kanade":    kanadeCommand.execute(arg, channel);         return;
            case "tenshi":             tenshiCommand.execute(channel);              return; 
            case "kanade,":            speakCommand.execute(message, arg, channel); return;
            case prefix + "recommend": recommendCommand.execute(arg, channel);      return;
            case prefix + "smug":      smugCommand.execute(channel);                return;
            case prefix + "music":     musicCommand.execute(arg, message);          return;
            case "goodnight":          goodnightCommand.execute(arg, message);      return;
            case prefix + "weather":   weatherCommand.execute(arg, message);        return;
            //case prefix + "anime":     animeCommand.execute(arg, message);          return;
            case prefix + "help":      helpCommand.execute(arg, message);           return;
            case prefix + "jisho":     jishoCommand.execute(arg, message);          return;
        }
    });
} catch (e) {

}

bot.login(botconfig.token);
 