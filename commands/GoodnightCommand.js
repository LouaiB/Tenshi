const randJsonItem = require("../imports/randJsonItem");
const goodnightImages = require("../json/goodnight.json");
const Discord = require("discord.js");

module.exports = {
    execute: function execute(arg, message){ 
        let recepient = arg;
        if(
            arg.toLowerCase() === "kanade" || 
            arg.toLowerCase() === "tachibana" || 
            arg.toLowerCase() === "tenshi" || 
            arg.toLowerCase() === "tachibana kanade" ||
            arg.toLowerCase() === "<@560114295153754115>"
        ){
            recepient = message.author.username;
        }

        let embed = new Discord.RichEmbed()
            .setDescription("Goodnight, " + recepient)
            .setImage(randJsonItem.getRandomItem(goodnightImages))
            .setColor("#66e0ff");

        try{ message.channel.send({embed}); }catch(e){ message.channel.send("I don't know why I can't send a goodnight message!"); }
        
    }
}